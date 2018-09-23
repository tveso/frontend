import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    private date: Date;
    private month: number;
    private year: number;
    public days: any[];
    @Input()public object;
    @Input() public filteredFunction;
    @Input() public handler;

  constructor() {
      this.build(new Date());
  }
  build(date) {
      this.date = date;
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
  }

  ngOnInit() {
      this.buildDays();
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
                  `${monthBeforeDate.getFullYear()}-${this.getFormatedMonth(monthBeforeDate.getMonth() + 1)}-${i}`});
      }
      for (let i = 1; i <= dayOneNumberOfDays; i++) {
          this.days.push({'day': i, 'type': 'currentMonth',
              'date': `${this.date.getFullYear()}-${this.getFormatedMonth(this.month + 1)}-${i}`});
      }
      for (let i = 1; i < daysNextMonth; i++) {
          this.days.push({'day': i, 'type': 'monthAfter',
              'date': `${monthAfterDate.getFullYear()}-${this.getFormatedMonth(monthAfterDate.getMonth() + 1)}-${i}`});
      }
    }

    getClass(day: any) {
      if (day.type === 'currentMonth') {
          if (this.isBusyDay(day)) {
              return 'busyDay';
          }
      }
        return day.type;
    }
    isBusyDay(day) {
        return this.filteredFunction.call(this.object, day.date).length !== 0;
    }
    getCurrentMonthInWord() {
            const locale = 'es-ES';
            const result =  this.date.toLocaleString(locale, { month: 'long' });
            return result.charAt(0).toUpperCase() + result.slice(1) + ' ' + this.date.getFullYear();
    }
    changeMonth(value) {
        const newDate = new Date(this.date.setMonth(this.month + value));
        this.build(newDate);
        this.buildDays();
    }

    private getFormatedMonth(number: number) {
        if (number < 10) {
            return `0${number}`;
        }
        return number;
    }

    clickHandler(day) {
      if (!this.isBusyDay(day)) {
          return;
      }
      console.log('ey');
        this.handler.call(this.object, day);
    }
}
