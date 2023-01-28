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
}