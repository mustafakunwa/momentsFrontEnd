import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient,
        public router: Router,
        private CookieService: CookieService) { }

    setuserData(data) {
        this.CookieService.remove('momentUser');
        this.CookieService.put('momentUser', JSON.stringify(data))
    }
    getuserData() {
        var User = this.CookieService.get('momentUser')
        if (User)
            return JSON.parse(this.CookieService.get('momentUser'))
        return
    }

    get userRole() {
        let user = JSON.parse(this.CookieService.get('momentUser'))
        return user.rolType;
    }


}
