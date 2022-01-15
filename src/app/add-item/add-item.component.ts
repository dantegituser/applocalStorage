import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LsService } from '../services/ls.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addform! :FormGroup;
  constructor(
    private fb:FormBuilder,
    private lsService: LsService,
    private socketservice: SocketService
  ) { }

  ngOnInit(): void {
    this.addform = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    })
  }
  onSubmit(){
    if(this.addform.invalid){return}
    const newItem = {
      id: Math.floor(Math.random() * 100) ,
      title: this.addform.value.title,
      text: this.addform.value.text,
    }
    this.lsService.addNewItem(newItem)
    this.socketservice.io.emit("getItems", this.lsService.localStorageItems)
    this.addform.reset({});
    this.addform.get('title')?.setErrors(null);
    this.addform.get('text')?.setErrors(null);
  }

}
