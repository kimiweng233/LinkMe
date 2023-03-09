import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:8000/api';

export interface IDResponse {
    ID: string
}

export interface AuthStatusResponse {
    status: boolean
}

@Injectable({
    providedIn: 'root'
})
export class Service {
    constructor(private http: HttpClient) { 

    }

    uploadCandidateInfo(data: any) {
        return this.http.post(`${baseUrl}/generateCoverLetter/`, data);
    }

    getCandidateInto(userId: string|null) {
        return this.http.get(`${baseUrl}/getCandidateInfo/${userId}/`);
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