import {Component, OnInit} from '@angular/core';
import {PageAbstract, SharedService} from '../../../entities/page.abstract';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../services/message.service';
import {TvshowService} from '../../../services/tvshow.service';
import {UtilService} from '../../../services/util.service';
import {ImageService} from '../../../services/image.service';
import {FindService} from '../../../services/find.service';
import {TitleService} from '../../../services/title.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['../tvshowpage/tvshowpage.component.css']
})
export class MoviepageComponent extends PageAbstract implements OnInit {
    departments = {
        'Writing': 'Guionista',
        'Costume & Make-Up': 'Disfraz y maquillaje',
        'Co-Executive Producer': 'Co-Productor Ejecutivo',
        'Production': 'Productor'
    };

    constructor(public imageService: ImageService, protected findService: FindService,
                activatedRouter: ActivatedRoute,
                dialog: MatDialog, titleService: TitleService, utilService: UtilService,
                sharedService: SharedService, messageService: MessageService, tvshowService: TvshowService) {
        super(imageService, findService, activatedRouter, dialog, titleService, utilService, sharedService, messageService, tvshowService);
    }

    sortByVoteAverage(posters: Array<any>) {
      if (typeof posters === 'undefined' || posters === null) {
          return posters;
      }
      posters = posters.slice();

      posters.sort((a, b) => {
          return b.vote_average - a.vote_average;
      });
      return posters;
    }
    getJob(creator) {
        if (creator.department in this.departments) {
            return this.departments[creator.department];
        }

        return creator.department;
    }
    getTrailer(m) {
      if (typeof m.videos === 'undefined') {
          return null;
      }
        const videos = m.videos.results;
        let result = null;
        videos.forEach((a) => {
            if (a.type === 'Trailer' && a.site === 'YouTube') {
                result = a.key;
            }
        });

        return result;
    }
}
