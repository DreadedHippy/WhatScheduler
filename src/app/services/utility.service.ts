import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private toastCtrl: ToastController) { }

  /**
   *
   * @param {string} message The message to be sent
   * @param {number} duration The duration of the message
   */

  async showToast(message: string, duration: number){
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: "top"
    })
    toast.present()

  }
}
