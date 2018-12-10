import {Component, Injectable, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MenuService} from '../../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@Injectable({
    providedIn: 'root'
})
export class SidebarComponent implements OnInit {
    @Input() show = false;
    userMenu: any;

    constructor(private router: Router, public userService: UserService, public menuService: MenuService) {
    }

  ngOnInit() {
      this.router.events.subscribe((val) => {
          this.show = false;
      });
      this.userMenu = this.menuService.getUserMenu( this.userService.getUserName());
  }

    open() {
        this.show = !this.show;
    }

    close() {
      this.show = false;
    }


}
