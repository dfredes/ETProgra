import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarViajesPage } from './modificar-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarViajesPageRoutingModule {}
