import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from '../../../services/image.service';

@Component({
  selector: 'app-tvshowepisode',
  templateUrl: './tvshowepisode.component.html',
  styleUrls: ['./tvshowepisode.component.css']
})
export class TvshowepisodeComponent implements OnInit {

   @Input() public episode;
    spoiler = true;
    @Input() public alternativePosterPath;
    public Math = Math;
  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }


    getBackground() {
      const path = (this.episode.still_path === null || typeof this.episode.still_path === 'undefined') ?
          this.alternativePosterPath : this.episode.still_path;
        const poster = this.imageService.getImageUrl(path, 'w1280');
        return `url(${poster})`;
    }

    getVotes() {
      if (typeof this.episode.vote_average === 'undefined') {
          return 'NR';
      }
        return Math.round(this.episode.vote_average * 100) / 100;
    }
}
