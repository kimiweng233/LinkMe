import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:8000/api';

export interface IDResponse {
    ID: string;
}

export interface AuthStatusResponse {
    status: boolean;
}

export interface Profile {
    name: string;
    schoolYear: string;
    major: string;
    skills: {
      [key: string]: Skill;
    };
    experiences: {
      [key: string]: Experience;
    };
  }
  
  export interface Skill {
    skill: string;
  }
  
  export interface Experience {
    company: string;
    title: string;
    // change to date field later
    startDate: string;
    endDate: string;
    description: string;
  }

@Injectable({
    providedIn: 'root'
})
export class Service {
    constructor(private http: HttpClient) { 

    }

    loadProfile: boolean = false;

    canLoadProfile = new Subject<boolean>(); 

    giveLoadingPermisison() {
        this.canLoadProfile.next(true); 
    }

    receiveLoadingPermission(): Observable<boolean> {
        return this.canLoadProfile.asObservable();
    }

    uploadCandidateInfo(data: any) {
        return this.http.post(`${baseUrl}/generateCoverLetter/`, data);
    }

    getCandidateInto(userId: string|null) {
        return this.http.get<Profile>(`${baseUrl}/getCandidateInfo/${userId}/`);
    }

    createUserProfile(data: any) {
        return this.http.post(`${baseUrl}/createUser/`, data);
    }

    loginUser(data: any) {
        return this.http.post(`${baseUrl}/loginUser/`, data);
    }

    logoutUser() {
        return this.http.post(`${baseUrl}/logoutUser/`, {});
    }

    getUserAuthStatus() {
        return this.http.get<AuthStatusResponse>(`${baseUrl}/getUserAuthStatus/`);
    }

    getUserID() {
        return this.http.get<IDResponse>(`${baseUrl}/getAuthUserID/`);
    }

    verifyCurrentUserID(id: number): Observable<boolean> {
        if (!localStorage.getItem('userData')) {
            return of(false);
        }
        return this.http.get<IDResponse>(`${baseUrl}/getAuthUserID/`).pipe(
            map((response: IDResponse) => {
                    if (id == parseInt(response.ID)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            )
        );
    }
}