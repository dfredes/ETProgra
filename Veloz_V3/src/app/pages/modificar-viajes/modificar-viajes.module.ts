import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarViajesPageRoutingModule } from './modificar-viajes-routing.module';

import { ModificarViajesPage } from './modificar-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarViajesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModificarViajesPage]
})
export class ModificarViajesPageModule {}
