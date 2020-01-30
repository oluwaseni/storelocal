import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  items: Item[] = [];

  @ViewChild('myList', {static: false})myList: IonList;

  constructor(private storageServices:StorageService, private plt:Platform, private toastController: ToastController, private router:Router) {
    this.plt.ready().then(()=>{
      this.loadItems();
      });
   }

  ngOnInit() {
  }

  
  loadItems(){
    this.storageServices.readItem().then(items =>{
      this.items = items;
    } );
  }


  deleteItem(item:Item){
    this.storageServices.deleteItem(item.id).then(item =>{
      this.showToast('Item Removed');
      this.myList.closeSlidingItems();
      this.loadItems();
    })
  }

  newItem(){
    this.router.navigate(['home']);
  }

  

  async showToast(msg){
    const toast = await this.toastController.create({
      message:msg,
      duration: 3000
    });

    toast.present();
  }

  

}
