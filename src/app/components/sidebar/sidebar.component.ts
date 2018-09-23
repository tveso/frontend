import {Component, Injectable, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
@Injectable({
    providedIn: 'root'
})
export class SidebarComponent implements OnInit {
    @Input() show = false;
  constructor(private router: Router) { }

  ngOnInit() {
      this.router.events.subscribe((val) => {
          this.show = false;
      });
  }

    open() {
        this.show = !this.show;
    }

    close() {
      this.show = false;
    }


}
