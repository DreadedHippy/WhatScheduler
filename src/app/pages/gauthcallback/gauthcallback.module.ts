import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GauthcallbackPageRoutingModule } from './gauthcallback-routing.module';

import { GauthcallbackPage } from './gauthcallback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GauthcallbackPageRoutingModule
  ],
  declarations: [GauthcallbackPage]
})
export class GauthcallbackPageModule {}
