import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import * as socketIo from 'socket.io-client';
import { Event } from './client-enums';

const SERVER_URL = 'localhost:3000';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
        this.socket.emit('message', "stuff");
    }

    public send(message: any): void {
        this.socket.emit('chat message', message);
    }

    public initiatePuppies(): void {
        this.socket.emit('puppies');
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('chat message', (data: any) => observer.next(data));
        });
    }

    public onPuppies(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('puppies', (data: any) => observer.next(data));
        });
    }
    public onEvent(event: Event): Observable<any> {
        console.log('event');
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}