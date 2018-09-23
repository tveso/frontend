import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  @Input() public id;
  @Input() public height = 560;
  @Input() public width = 315;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getUrl() {
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.id);
  }

}
