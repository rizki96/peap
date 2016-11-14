import { EventEmitter, Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class EventService {

    public userInfo: EventEmitter<User> = new EventEmitter<User>();

    constructor() {

    }
}