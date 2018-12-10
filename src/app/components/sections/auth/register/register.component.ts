import {Component, Inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {SecurityService} from '../../../../services/security.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'angular-6-social-login-v2';
import {TwitterService} from '../../../../services/twitter.service';
import {WINDOW} from '../../../../provider/windowProvider';
import {User} from '../../../../entities/user';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginComponent} from '../login/login.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends LoginComponent {
    registerForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        email: new FormControl(''),
        confirmpassword: new FormControl('', [this.confirmPassword])
    });
    public model: User = new User({});
    public loading = false;
    public errors: any[];
    constructor(public securityService: SecurityService, protected router: Router,
                protected  socialAuthService: AuthService, protected  twitterService: TwitterService,
                @Inject(WINDOW) protected  window: Window, protected  route: ActivatedRoute) {
        super(securityService, router, socialAuthService, twitterService, window, route);
    }

    get username() {
        return this.registerForm.get('username');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get confirmpassword() {
        return this.registerForm.get('confirmpassword');
    }


    confirmPassword(control: AbstractControl): { [key: string]: boolean } | null {
        if (typeof control.parent === 'undefined') {
            return null;
        }
        const password = control.parent.get('password').value;
        const actual = control.value;
        if (password !== actual) {
            return {'confirmpassword': true};
        }
        return null;
    }

    onSubmit() {
        this.loading = true;
        this.errors = [];
        const data = this.registerForm.value;
        this.securityService.register(data).subscribe((response) => {
            this.securityService.user = response.user;
            if (this.securityService.loggedIn()) {
                this.router.navigate(['/home']);
            }
        }, (error: HttpErrorResponse) => {
            this.loading = false;
                this.errors = error.error.errors;
        });
    }
}

