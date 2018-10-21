import {Component, OnInit} from '@angular/core';
import {ConfigService} from './services/config.service';
import {SecurityService} from './services/security.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    dataLoaded = false;
    constructor(private router: Router, protected configService: ConfigService,
                public securityService: SecurityService) { }

    ngOnInit() {
        this.configService.init().subscribe(null, null, () => {
            this.dataLoaded = true;

        });
    }
}
