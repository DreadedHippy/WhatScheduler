import { Injectable } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private toastCtrl: ToastController,
    private msgSrv: MessagingService,
    private navCtrl: NavController
  ) { }

  // timeFormat: Intl.DateTimeFormatOptions = {
  //   year: 'numeric',
  //   month: 'short',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  // };

  /**
   *
   * @param {string} message The message to be sent
   * @param {number} duration The duration of the message
   */

  async showToast(message: string, duration: number, position: "top" | "bottom" | "middle" | undefined = "top"){
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: position,
      cssClass: "custom-toast"
    })
    toast.present()
  }

  toDate(dateString: string, options: Intl.DateTimeFormatOptions){
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options)
  }

  getChatInfo(chatID: string){
    const chat =  this.msgSrv.clientChats.find(elem => elem.id._serialized === chatID)
    if(!chat){
      this.navCtrl.navigateRoot("/home")
      return {name: "", isGroup: false}
    }
    return {name: chat.name, isGroup: chat.isGroup}
  }
}
