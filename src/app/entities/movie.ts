import {slugify} from '../components/utils/functions';

export class Movie {
    _id: string;
    title: string;
    poster_path: string;
    genre_ids: Array<string>;
    overview: string;
    release_date: Date;
    vote_average: string;
    titles: any;
    backdrop_path: string;
    images: any;
    seasons: any;
    type: string;
    rating: any;
    year: any;
    primaryTitle: any;
    next_episode_to_air: any;
    userFollow: any;
    name: any;
    static  getTitle(tvshow): any {
        if (typeof tvshow.name !== 'undefined') {
            return tvshow.name;
        }
        if (typeof tvshow.title !== 'undefined') {
            return tvshow.title;
        }
        return tvshow.title;
    }
    static getUrl(movie: Movie): string {
        if (typeof movie === 'undefined') { return ''; }
        return `/${movie.type}/${slugify(Movie.getTitle(movie))}/${movie._id}`;
    }
}
