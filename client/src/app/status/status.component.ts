import { Component } from '@angular/core';
import { DataService } from '../../lib/data.service';
import { SocketMeta } from '../../lib/data.model';

@Component({
  selector: 'status',
  templateUrl: './status.html',
  styleUrls: ['./status.css']
})
export class StatusComponent {

    messageStatus: SocketMeta = new SocketMeta('MESSAGE', false);
  constructor(private dataService: DataService) { 
      this.dataService.messageSubject.subscribe((status) => {   
            this.messageStatus = status;
      });
  }

  toggleColor(val: boolean) {
      return val ? 'green' : 'red';
  }
}
