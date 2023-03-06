import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecurringPage } from './recurring.page';

const routes: Routes = [
  {
    path: '',
    component: RecurringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecurringPageRoutingModule {}
