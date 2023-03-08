import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:8000/api';

export interface IDResponse {
    ID: string
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

    getAuthUserID() {
        return this.http.get<IDResponse>(`${baseUrl}/getAuthUserID/`, {})
    }

    verifyCurrentUserID(id: number): Observable<boolean> {
        return this.http.get<IDResponse>(`${baseUrl}/getAuthUserID/`).pipe(
            map((response: IDResponse) => {
                    console.log(response);
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