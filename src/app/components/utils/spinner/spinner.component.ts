import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
    private error = false;
   @Input() public className = '';
   @Input() numSpin = 5;
   @Input() type = 'circles';
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.listen().subscribe((a) => {
        if (a.get('xherror') === true) {
            this.error = true;
        }
        this.error = false;

    });
  }

    getNumOfSpins() {
      const list = [];
        for (let i = 0; i <= this.numSpin; i++) {
            list.push(i);
        }

        return list;
    }
}
