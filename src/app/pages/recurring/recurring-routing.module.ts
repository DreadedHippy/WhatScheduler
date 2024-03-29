import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecurringPage } from './recurring.page';

const routes: Routes = [
  {
    path: '',
    component: RecurringPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecurringPageRoutingModule {}
