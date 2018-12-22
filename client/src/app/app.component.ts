import { Component, OnInit, HostListener } from '@angular/core';
import { Action, Event } from '../lib/client-enums';
import { SocketService } from '../lib/socket.service';
import { DataService } from '../lib/data.service';
import { SocketMeta } from '../lib/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  action = Action;
  user: any = "tony";
  messages: any[] = [];
  messageContent: string;
  ioConnection: any;
  urls: any[] = [];
  count = 0;
  userMessage: string = '';
  errorMessages = [];
  connectMessages = [];
  isDebug: boolean = false;
  
  constructor(private socketService: SocketService, private dataService: DataService) { }

  ngOnInit(): void {
    this.isDebug = true;
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: any) => {
        this.handleConnect('MESSAGES');
        this.messages.push(message);
      }), this.handleError('MESSAGES');

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        this.handleConnect('CONNECT');
        this.dataService.updateMessageSubject(new SocketMeta('MESSAGE', true));
        console.log('connected');
      }), this.handleError('CONNECT');
      
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        this.handleConnect('DISCONNECT');
        this.dataService.updateMessageSubject(new SocketMeta('MESSAGE', false));
        console.log('disconnected');
      }), this.handleError('DISCONNECT');

    // this.socketService.onPuppies()
    //   .subscribe((url) => {
    //     // this.urls.pop();
    //     this.urls.push(url);
    //   });

    //   this.socketService.initiatePuppies();
  }

  handleError(socket: string) {
    this.errorMessages.unshift(`Not connected to socket: ${socket}`);
  }
  handleConnect(socket: string) {
    this.connectMessages.unshift(`Connected to socket: ${socket}`);
  }

  @HostListener('window:keyup', ['$event'])
  handleSearchSubmit(event: KeyboardEvent) {
    if (event.keyCode === 13 && this.userMessage.length) {
      this.sendMessage(this.userMessage);
    }
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    console.log(message);
    this.socketService.send(message);
    this.userMessage = '';
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: any;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }
}
