import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    url: string = 'http://localhost:8081';
    baseUrl: string = 'http://localhost:8081/users/';
    loggedInUser: any;
    constructor(private http: HttpClient) { }

    login(loginPayload) {
        const headers = {
            'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
            'Content-type': 'application/x-www-form-urlencoded'
        }
        return this.http.post('http://localhost:8081/' + 'oauth/token', loginPayload, { headers });
    }

    validate(user) {
        return this.http.post(this.url + '/api/login', user);
    }

    getUser(id) {
        return this.http.get(this.url + '/api/user/' + id);
    }

    saveUser(loginUser) {
        return this.http.post(this.url + '/api/register/', loginUser);
    }

    getUsers() {
        return this.http.get(this.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
      }
}