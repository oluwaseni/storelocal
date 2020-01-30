import { Component, ViewChild } from '@angular/core';
import { Item, StorageService } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  

  newItem: Item = <Item>{};

 

  constructor(private storageServices:StorageService, private plt:Platform, private toastController: ToastController, private router:Router) {
    // this.plt.ready().then(()=>{
    // this.loadItems();
    // });
   
  }

  //Create


  addItem(){
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageServices.addItem(this.newItem).then(item =>{
      this.newItem = <Item> {};

      this.router.navigate(['list']);
     

    });

  }



  updateItem(item:Item){
    item.title = `UPDATED: ${item.title}`;
    item.modified = Date.now();

    this.storageServices.updateItem(item).then(item =>{
      this.showToast('Item updated')
    })
  }


  


  async showToast(msg){
    const toast = await this.toastController.create({
      message:msg,
      duration: 3000
    });

    toast.present();
  }

  
}
