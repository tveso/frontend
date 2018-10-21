import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../../../../services/security.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router, private securityService: SecurityService) {
    }

    ngOnInit() {
        this.securityService.logout().subscribe((a) => {
            this.securityService.user = null;
            this.router.navigate(['/login']);
        });
    }

}
