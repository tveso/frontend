
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
    static  getTitle(tvshow): any {
        if (typeof tvshow.name !== 'undefined') {
            return tvshow.name;
        }
        if (typeof tvshow.title !== 'undefined') {
            return tvshow.title;
        }
        return tvshow.title;
    }
}
