import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recurring',
  templateUrl: './recurring.page.html',
  styleUrls: ['./recurring.page.scss'],
})
export class RecurringPage implements OnInit {
  title = "Recurring";

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onSearchChange(e: any){

  }

  addTask(){
    this.navCtrl.navigateForward("recurring/new")
  }

}
