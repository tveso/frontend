import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-tvshowepisode',
  templateUrl: './tvshowepisode.component.html',
  styleUrls: ['./tvshowepisode.component.css']
})
export class TvshowepisodeComponent implements OnInit {

   @Input() public episode;
    spoiler = true;
    public Math = Math;
  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }


    getBackground() {
        const poster = this.imageService.getImageUrl(this.episode.still_path, 'w1280');
        return `url(${poster})`;
    }

}
