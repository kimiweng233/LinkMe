import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8000/api';

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
        return this.http.post(`${baseUrl}/loginUser/`, data)
    }

    logoutUser() {
        return this.http.post(`${baseUrl}/logoutUser/`, {"message": "logout user"});
    }
}