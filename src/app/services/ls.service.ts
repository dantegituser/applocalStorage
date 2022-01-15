import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Items } from './items.model';

@Injectable({
  providedIn: 'root'
})
export class LsService {

  localStorageItems: Items[] = [];
  newElements = new Subject<boolean>();
  constructor(
  ) {
    this.initLocalS()
  }

  initLocalS(){
    localStorage.clear()
    // this.addLsItems()
  }
  addUserItems(items:any){
    console.log("items que vienen del socket", items);
    this.localStorageItems = items;
    localStorage.setItem('appLS', JSON.stringify(items))
    this.newElements.next(true)
  }
  addLsItems(){
    // this.localStorageItems = this.localStorageItems;
    localStorage.setItem('appLS', JSON.stringify(this.localStorageItems))
    this.newElements.next(true)
  }
  getLSItems(){
      const newItems = localStorage.getItem('appLS');
      this.localStorageItems = JSON.parse(newItems!);
  }
  addNewItem(newItemData: Items){
    const newItem = {
      id: newItemData.id,
      title: newItemData.title,
      text:  newItemData.text
    }
    this.localStorageItems.push(newItem);
    this.addLsItems()
  }
  deleteItem(id:number){
    console.log('borrando service', id);

    const newArrayLs = this.localStorageItems
    .filter(item => item.id !== id)
    this.localStorageItems = newArrayLs;
    this.addLsItems()
  }
}
