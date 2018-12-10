import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {MenuService} from '../../../services/menu.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuUser: any;
    constructor(public userService: UserService, public menuService: MenuService) {
    }

  ngOnInit() {
        this.menuUser = this.menuService.getUserMenu(this.userService.getUser().username);
  }

}
