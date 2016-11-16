import { EventEmitter, Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class EventService {

    public userInfo: EventEmitter<User> = new EventEmitter<User>();
    public pageIndex: EventEmitter<number> = new EventEmitter<number>();

    constructor() {

    }
}