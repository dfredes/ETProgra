import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarAutoPage } from './modificar-auto.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarAutoPageRoutingModule {}
