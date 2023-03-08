import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPageRoutingModule } from './new-routing.module';

import { NewPage } from './new.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [NewPage]
})
export class NewPageModule {}
