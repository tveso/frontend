import {Component} from '@angular/core';
import {MovielistComponent} from '../movielist/movielist.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../../services/config.service';
import {FindService} from '../../../services/find.service';

@Component({
  selector: 'app-tvshowlist',
  templateUrl: './tvshowlist.component.html',
  styleUrls: ['../movielist/movielist.component.css']
})
export class TvshowlistComponent extends MovielistComponent {
    protected type = 'tvshow';

    constructor(protected findService: FindService, protected router: Router, public activatedRouter: ActivatedRoute,
                public configService: ConfigService) {
        super(findService, router, activatedRouter, configService);
        this.scrollCallback = this.getMovies.bind(this);
    }

}
