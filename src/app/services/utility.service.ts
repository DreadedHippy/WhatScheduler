import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private toastCtrl: ToastController) { }

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
}
