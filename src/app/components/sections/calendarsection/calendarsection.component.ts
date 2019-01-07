import {Component, EventEmitter, OnInit} from '@angular/core';
import {CalendarComponent, CalendarDate, formatDate} from '../../utils/calendar/calendar.component';
import {CalendarService, CalendarServiceParams} from '../../../services/calendar.service';
import {getNumPad} from '../../models/tvshowepisode/tvshowepisode.component';
import {stringToColour} from '../../utils/functions';
import {EpisodeCalendarProperties} from '../../models/epiosodescalendar/epiosodescalendar.component';

@Component({
  selector: 'app-calendarsection',
  templateUrl: './calendarsection.component.html',
  styleUrls: ['./calendarsection.component.scss']
})
export class CalendarsectionComponent implements OnInit {
    ngOnInit(): void {
    }


}
@Component({
    selector: 'app-calendarmovies',
    templateUrl: './calendarmovies.component.html',
    styleUrls: ['./calendarsection.component.scss']
})
export class CalendarMoviesComponent implements OnInit {

    calendar$ = new EventEmitter<CalendarDate>();
    currentDate;
    episodesMonth = [];
    loading = false;
    events = [];
    params: CalendarServiceParams = {include_movies: 1, include_tvshows: 0, only_user_followed: 0};
    constructor(protected calendarService: CalendarService) {
        this.setCurrentDate(new Date());
    }

    ngOnInit() {
        this.getEventsFromDate(this.currentDate);
        this.getEpisodesThisMonth(this.currentDate);
    }
    getEpisodesThisMonth(date: string) {
    }

    setCurrentDate(date: Date) {
        this.currentDate = `${date.getFullYear()}-${this.getFormatedMonth(date.getUTCMonth() + 1)}-${this.getFormatedMonth(date.getUTCDate())}`;
    }
    update() {
        this.events = [];
        this.getEventsFromDate(this.currentDate);
    }
    changeDate(date: CalendarDate) {
        this.calendar$.emit(date);
        this.setCurrentDate(new Date(date.date));
        this.events = [];
        this.getEventsFromDate(this.currentDate);
    }
    getDateBg(date: string) {
        if (this.currentDate === date) {
            return {'background-color': 'rgba(220,220,220,1)'};
        }
        if (this.isBusyDate(date)) {
            return {'background-color': 'rgba(244,39,11,0.7)', color: '#FFF'};
        }
    }
    private getFormatedMonth(number: number) {
        if (number < 10) {
            return `0${number}`;
        }
        return number;
    }

    private getEventsFromDate(date: string) {
        this.params.date = date;
        this.loading = true;
        this.calendarService.bydate(this.params).subscribe((a) => {
            this.events.push(a);
            this.loading = false;
        }, error =>  this.loading = false);
    }

    private isBusyDate(date: string) {
        return this.episodesMonth.filter(episode => episode.air_date === date).length > 0;
    }
}
@Component({
    selector: 'app-calendarmovies',
    templateUrl: './calendartvshows.component.html',
    styleUrls: ['./calendarsection.component.scss']
})
export class CalendarTvshowsComponent extends CalendarMoviesComponent {
    params: CalendarServiceParams = {include_movies: 0, include_tvshows: 1, only_user_followed: 0};
    constructor(protected calendarService: CalendarService) {
        super(calendarService);
    }
}

@Component({
    selector: 'app-mycalendar',
    templateUrl: './mycalendar.component.html',
    styleUrls: ['./mycalendar.component.scss']
})
export class MyCalendarComponent extends CalendarComponent implements OnInit {
    constructor( private calendarService: CalendarService) {
        super();
    }
    getEpisodesCallback(props: EpisodeCalendarProperties) {
        return this.calendarService.getEpisodesBetweenDates(props.minDate, props.maxDate);
    }
}
