import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export class CalendarDate {
    public date?: string;
    public type?: string;
    public day?: Number;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    protected date: Date;
    protected month: number;
    protected year: number;
    public days: any[];
    @Input() public dayBgColorFn;
    @Input() public handler;
    @Input() public calendar$: EventEmitter<CalendarDate> = new EventEmitter<CalendarDate>();
    content = 'calendar';
    protected years: Array<Number>;
    protected yearSelected: number;

  constructor() {
      this.build(new Date());
  }
  build(date) {
      this.date = date;
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
      this.yearSelected = this.year;
      this.generateYears();
  }

  ngOnInit() {
      this.buildDays();
      this.calendar$.subscribe((a: CalendarDate) => {
          this.changeMonth(a.date);
      });
  }
  buildDays() {
      const dayOneDate = new Date(`${this.year}-${this.month + 1}-01`);
      const dayOneNumberOfDays = new Date(dayOneDate.getFullYear(), dayOneDate.getMonth() + 1, 0).getDate();
      let dayOneWeekDay = dayOneDate.getDay() - 1;
      if (dayOneDate.getDay() === 0) {
          dayOneWeekDay = 6;
      }
      const monthBeforeDate = new Date(dayOneDate.setMonth(this.month - 1));
      const monthAfterDate = new Date(dayOneDate.setMonth(this.month + 1));
      const monthBeforeNumberOfDays = new Date(monthBeforeDate.getFullYear(), monthBeforeDate.getMonth() + 1 , 0).getDate();
      let daysNextMonth = dayOneNumberOfDays + dayOneWeekDay;
      daysNextMonth = daysNextMonth - dayOneNumberOfDays;
      this.days = [];
      for (let i = monthBeforeNumberOfDays - dayOneWeekDay + 1; i <= monthBeforeNumberOfDays; i++) {
          this.days.push({'day': i, 'type': 'monthBefore', 'date':
                  `${monthBeforeDate.getFullYear()}-${getFormatedMonth(monthBeforeDate.getMonth() + 1)}-${getFormatedMonth(i)}`
          });
      }
      for (let i = 1; i <= dayOneNumberOfDays; i++) {
          this.days.push({'day': i, 'type': 'currentMonth',
              'date': `${this.date.getFullYear()}-${getFormatedMonth(this.month + 1)}-${getFormatedMonth(i)}`
          });
      }
      for (let i = 1; i < daysNextMonth; i++) {
          this.days.push({'day': i, 'type': 'monthAfter',
              'date': `${monthAfterDate.getFullYear()}-${getFormatedMonth(monthAfterDate.getMonth() + 1)}-${getFormatedMonth(i)}`
          });
      }
    }
    getBgColor(day) {
      if (typeof this.dayBgColorFn === 'undefined') {
          return;
      }
        return this.dayBgColorFn(day.date);
    }
    getCurrentMonthInWord() {
            const locale = 'es-ES';
            const result =  this.date.toLocaleString(locale, { month: 'long' });
            return result.charAt(0).toUpperCase() + result.slice(1) + ' ' + this.date.getFullYear();
    }
    changeMonth(value) {
        const newDate = new Date(value);
        this.build(newDate);
        this.buildDays();
    }



    clickHandler(day) {
        this.handler(day);
    }

    controlLess() {
        if (this.content === 'calendar') {
            const newDate = new Date(this.date.setMonth(this.month - 1));
            this.build(newDate);
            this.buildDays();
            this.calendar$.emit({date: `${this.year}-${this.month + 1}-01`});
            return;
        }
        this.yearSelected -=  22;
        this.generateYears();
    }

    controlMore() {
      if (this.content === 'calendar') {
          const newDate = new Date(this.date.setMonth(this.month + 1));
          this.build(newDate);
          this.buildDays();
          this.calendar$.emit({date: `${this.year}-${this.month + 1}-01`});
          return;
      }
      this.yearSelected += 22;
      this.generateYears();
    }

    private generateYears() {
      const boxes = 42;
      const half = Math.floor(boxes / 2);
      const start = boxes - half;
      const startYear = this.yearSelected - start;
      const endYear = this.yearSelected + start;
      let counter = 0;
      this.years = [];
      for (let i = startYear; i < endYear; i++ ) {
          this.years[counter] = i;
          ++counter;
      }
  }

    changeYear(year) {
        const newDate = new Date(this.date.setFullYear(year));
        this.build(newDate);
        this.buildDays();
        this.content = 'calendar';
        this.calendar$.emit({date: `${this.year}-${this.month + 1}-01`});
    }
}

export const getFormatedMonth = (number: number) => {
    if (number < 10) {
        return `0${number}`;
    }
    return number;
};
export const formatDate = (date: Date) => {
    return   `${date.getFullYear()}-${getFormatedMonth(date.getMonth() + 1)}-${getFormatedMonth(date.getDate())}`;
};
