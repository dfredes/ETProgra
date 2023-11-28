import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarAutoPageRoutingModule } from './modificar-auto-routing.module';

import { ModificarAutoPage } from './modificar-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarAutoPageRoutingModule
  ],
  declarations: [ModificarAutoPage]
})
export class ModificarAutoPageModule {}
