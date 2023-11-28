import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterfazViajePage } from './interfaz-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: InterfazViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterfazViajePageRoutingModule {}
