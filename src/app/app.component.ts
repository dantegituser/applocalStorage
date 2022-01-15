import { Component, OnInit } from '@angular/core';
import { LsService } from './services/ls.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 constructor(
   private socketservice: SocketService,
   private lsService: LsService
 ){}
 ngOnInit(): void {
 }
}
