import {Component} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent extends LoginComponent {
    registerForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        email: new FormControl(''),
        confirmpassword: new FormControl('', [this.confirmPassword])
    });

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
        const password = control.parent.controls;
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
        }, (error) => {
            this.loading = false;
            if (error.status === 401 || error.status === 500) {
                this.errors.push('No se ha podido registrar al usuario, hay errores en el formulario');
            }
        });
    }
}

