import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterfazViajePageRoutingModule } from './interfaz-viaje-routing.module';

import { InterfazViajePage } from './interfaz-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterfazViajePageRoutingModule
  ],
  declarations: [InterfazViajePage]
})
export class InterfazViajePageModule {}
