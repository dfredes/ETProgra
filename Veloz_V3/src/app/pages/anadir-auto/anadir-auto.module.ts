import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirAutoPageRoutingModule } from './anadir-auto-routing.module';

import { AnadirAutoPage } from './anadir-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirAutoPageRoutingModule
  ],
  declarations: [AnadirAutoPage]
})
export class AnadirAutoPageModule {}
