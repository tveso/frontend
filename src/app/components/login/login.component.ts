import { Component, OnInit } from '@angular/core';
import {User} from '../../entities/user';
import {SecurityService} from '../../services/security.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public model: User = new User();
    constructor(private securityService: SecurityService, private router: Router) {
    }

    ngOnInit() {
        if (this.securityService.loggedIn()){
            this.router.navigate(['/home']);
        }
    }

    onSubmit() {
        this.securityService.login(this.model).subscribe((data) => {
            if (data === true) {
                this.router.navigate(['/home']);
            }
        });
    }
}
