import {ImageService} from '../services/image.service';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../services/util.service';
import {MoviesService} from '../services/movies.service';
import {FindService} from '../services/find.service';

export class PageAbstract {
    departments = {
        'Writing': 'Guionista',
        'Costume & Make-Up': 'Disfraz y maquillaje',
        'Co-Executive Producer': 'Co-Productor Ejecutivo',
        'Production': 'Productor'
    };
    public genreNumbers =  2;
    public creatorsShown = 4;
    constructor(private imageService: ImageService) {}
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
    getBackground(resource) {
        const poster = this.imageService.getImageUrl(resource.backdrop_path, 'w1280');
        return `url(${poster})`;
    }

    orderCrew(crew) {
        const result = crew.slice();
        return result.sort((a, b) => {
            const ranking = {'Director': 5, 'Executive Producer': 4, 'Production': 4, 'Co-Executive Producer': 4, 'Writing': 3};
            let aValue = 0;
            let bValue = 0;
            if (a.department in ranking) {
                aValue = ranking[a.department];
            }
            if (b.department in ranking) {
                bValue = ranking[b.department];
            }

            return bValue - aValue;
        });
    }
}
