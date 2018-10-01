import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  @Input() public id;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getUrl() {
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.id);
  }

}
