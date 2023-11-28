import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-anadir-auto',
  templateUrl: './anadir-auto.page.html',
  styleUrls: ['./anadir-auto.page.scss'],
})
export class AnadirAutoPage implements OnInit {
  patente: string = "";
  marca: string = "";
  asientos: number = 0;
  formSubmitted: boolean = false;
  patenteTouched: boolean = false;
  marcaTouched: boolean = false;
  asientosTouched: boolean = false;

  idUsuario: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private db: DbservicioService
  ) {}

  ngOnInit(){
    this.idUsuario = localStorage.getItem('idUsuario')
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Auto Creado',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  validatePatente() {
    this.patenteTouched = true;
  }

  validateMarca() {
    this.marcaTouched = true;
  }

  validateAsientos() {
    this.asientosTouched = true;
  }

  isPatenteValid(): boolean {
    return /^[A-Za-z]{4}[0-9]{2}$/.test(this.patente);
  }

  isMarcaValid(): boolean {
    return /^[A-Za-z ]+$/.test(this.marca);
  }

  isAsientosValid(): boolean {
    return !isNaN(this.asientos) && this.asientos >= 4 && this.asientos <= 8;
  }

  async crearAuto() {
    this.formSubmitted = true;

    if (!this.isPatenteValid() || !this.isMarcaValid() || !this.isAsientosValid()) {
      const toast = await this.toastController.create({
        message: 'Por favor, complete los campos correctamente.',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
      return;
    }

    // Si todas las validaciones pasan, continuar con la lógica para actualizar los datos
    this.db.insertarAuto(this.patente,this.marca,this.asientos,this.idUsuario);
  }

  cancelar() {
    this.router.navigate(['/perfil']);
  }
}
