import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Items } from '../services/items.model';
import { LsService } from '../services/ls.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  itemsSub!: Subscription;
  items:Items[] = [];
  constructor(
    private lsService: LsService,
    private socketservice: SocketService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.lsService.newElements
    .subscribe(resp => {
      this.items = this.lsService.localStorageItems;
    })
  }
  onDelete(id:number){
    this.lsService.deleteItem(id)
    this.socketservice.io.emit("getItems", this.lsService.localStorageItems)
  }


}
