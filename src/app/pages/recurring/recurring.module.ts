import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecurringPageRoutingModule } from './recurring-routing.module';

import { RecurringPage } from './recurring.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecurringPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RecurringPage]
})
export class RecurringPageModule {}
