import { Injectable } from '@angular/core';
import { SocketMeta } from './data.model';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {
    constructor() {}

    public messageSubject: Subject<SocketMeta> = new Subject<SocketMeta>();

    updateMessageSubject(status: SocketMeta) {
        this.messageSubject.next(status);
    }
}