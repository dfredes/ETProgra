import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirAutoPage } from './anadir-auto.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirAutoPageRoutingModule {}
