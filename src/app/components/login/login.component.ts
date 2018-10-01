import { Component, OnInit } from '@angular/core';
import {User} from '../../entities/user';
import {SecurityService} from '../../services/security.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {HttpEvent} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import {_catch} from 'rxjs-compat/operator/catch';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public model: User = new User();
    public loading = false;
    public errors = [];
    constructor(public securityService: SecurityService, private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.loading = true;
        this.errors = [];
        this.securityService.login(this.model).subscribe((data: any) => {
            this.securityService.user = data.user;
            this.loading = false;
            if (this.securityService.loggedIn()) {
                this.router.navigate(['/home']);
            }
        }, (error) => {
            this.loading = false;
            if (error.status === 401) {
                this.errors.push('El nombre de usuario o la contraseña son inválidas');
            }
        });
    }
}
