import { ApiService } from './api.service';
import { DataService } from './data.service';
import { LocalStorage } from './localstorage.service';
import { SocketService } from './socket.service';
import { EventService } from './event.service';

export const APP_SERVICE_PROVIDERS: any[] = [
  { provide: ApiService, useClass: ApiService },
  { provide: DataService, useClass: DataService },
  { provide: LocalStorage, useClass: LocalStorage },
  { provide: SocketService, useClass: SocketService },
  { provide: EventService, useClass: EventService }
];

export {
  ApiService,
  DataService,
  LocalStorage,
  SocketService,
  EventService
};
