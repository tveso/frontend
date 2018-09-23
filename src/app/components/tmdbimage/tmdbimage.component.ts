import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-tmdbimage',
  templateUrl: './tmdbimage.component.html',
  styleUrls: ['./tmdbimage.component.css'],
})
export class TmdbimageComponent implements OnInit, OnChanges {
  @Input() image: string;
    @Input() uri = 'https://image.tmdb.org/t/p';
  @Input() size = 'w154';
  @Input() src: string;
  constructor(private imageService: ImageService) { }
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
      this.src = this.imageService.getImageUrl(this.image, this.size);

    }

}
