import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class StrategyService {

    // url: string = 'http://sms-env.av2vpzbwvh.us-east-1.elasticbeanstalk.com/api/';
    url: string = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) { }

    getAllStrategies() {
        return this.http.get(this.url + 'getAllStrategies?access_token='
            + JSON.parse(window.sessionStorage.getItem('token')).access_token);
    }

    createStrategy(grn: any) {
        return this.http.post(this.url + 'strategy?access_token='
        + JSON.parse(window.sessionStorage.getItem('token')).access_token, grn);
    }

    updateStrategy(grn: any) {
        return this.http.put(this.url + 'strategyorganisation?access_token='
        + JSON.parse(window.sessionStorage.getItem('token')).access_token, grn);
    }

    deleteStrategy(id) {
        return this.http.delete(this.url + 'strategy/' + id + '?access_token='
        + JSON.parse(window.sessionStorage.getItem('token')).access_token);
    }
}