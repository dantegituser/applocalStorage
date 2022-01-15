import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { LsService } from './ls.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  io = io("http://localhost:3000/", {
    withCredentials: true,
    autoConnect: true
  });
  constructor(
    private lsService: LsService
  ) {
      this.io.on('passItems', (items) => {
        this.lsService.addUserItems(items)
      })
   }

}
