import {Component, Input, OnInit} from '@angular/core';
import {CalendarService, CalendarServiceParams} from '../../../services/calendar.service';
import {stringToColour} from '../../utils/functions';
import {CalendarComponent, CalendarDate, formatDate} from '../../utils/calendar/calendar.component';
import {getNumPad} from '../tvshowepisode/tvshowepisode.component';
import {Episode} from '../../../entities/episode';
import {of} from 'rxjs';

export class EpisodeCalendarProperties {
    minDate?: string;
    maxDate?: string;
    episodes?: Array<Episode>;
}

@Component({
  selector: 'app-epiosodescalendar',
  templateUrl: './epiosodescalendar.component.html',
  styleUrls: ['./epiosodescalendar.component.scss']
})
export class EpiosodescalendarComponent extends CalendarComponent implements OnInit {
    params: CalendarServiceParams = {include_movies: 0, include_tvshows: 1, only_user_followed: 0};
    private episodes = [];
    @Input() title;
    private dates = new Set();
    @Input() public callback = (props: EpisodeCalendarProperties) => of();
    constructor(private calendarService: CalendarService) {
        super();
        this.handler = () => {};
    }
    bgColour(colour: string) {
        return stringToColour(colour);
    }
    ngOnInit() {
        if (this.initialDate) {
            this.build(this.initialDate);
        }
        this.buildDays();
        this.calendar$.subscribe((a: CalendarDate) => {
            this.changeMonth(a.date);
            let dayOneDate: any = new Date(a.date);
            dayOneDate.setDate(1);
            dayOneDate = formatDate(dayOneDate);
            let lastDayDate: any = new Date(a.date);
            lastDayDate.setDate(31);
            lastDayDate = formatDate(lastDayDate);
            if (this.dates.has(dayOneDate)) {
                return;
            }
            this.dates.add(dayOneDate);
            this.callback({minDate: dayOneDate, maxDate: lastDayDate, episodes: this.episodes}).subscribe((episodes) => {
                this.episodes = this.episodes.concat(episodes);
            });
        });
        this.calendar$.emit({date: formatDate(this.date)});
    }
    getNumericalEpisode(episode) {
        return `${episode.season_number}x${getNumPad(episode.episode_number)}`;
    }
    getEpisodesFromDate(date: string) {
        return this.episodes.filter(a => a.air_date === date);
    }
}
