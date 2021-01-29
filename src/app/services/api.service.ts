import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpBackend } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }


    singup(requestData): Observable<any> {
        return this.http
            .post<any>(environment.api + '/users', requestData)
            .pipe(catchError(this.handleErrorObservable))
    }

    signin(requestData): Observable<any> {
        return this.http
        .post<any>(environment.api + '/users/login', requestData)
        .pipe(catchError(this.handleErrorObservable))
    }

    logout(): Observable<any> {
        return this.http
        .post<any>(environment.api + '/users/logout', {})
        .pipe(catchError(this.handleErrorObservable))
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return throwError(error);
    }
}
