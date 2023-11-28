import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-modificar-auto',
  templateUrl: './modificar-auto.page.html',
  styleUrls: ['./modificar-auto.page.scss'],
})
export class ModificarAutoPage {
  
  idAuto="";
  patente="";
  marca="";
  asientos= 0;
  fk_idUsuario="";

  formSubmitted: boolean = false;
  patenteTouched: boolean = false;
  marcaTouched: boolean = false;
  asientosTouched: boolean = false;

  constructor(private alertController: AlertController,private router: Router,private toastController: ToastController,private db: DbservicioService,private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idAuto = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.patente = this.router.getCurrentNavigation()?.extras?.state?.['patenteEnviado'];
        this.marca = this.router.getCurrentNavigation()?.extras?.state?.['marcaEnviado'];
        this.asientos = this.router.getCurrentNavigation()?.extras?.state?.['asientosEnviado'];
        this.fk_idUsuario = this.router.getCurrentNavigation()?.extras?.state?.['fk_idUsuario'];
      }
    })
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Actualización de Datos',
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

  actualizarDatos() {
    this.formSubmitted = true;

    if (!this.isPatenteValid() || !this.isMarcaValid() || !this.isAsientosValid()) {
      this.presentAlert("Error en el formulario");
    } else {
      // Si todas las validaciones pasan, continuar con la lógica para actualizar los datos
      this.db.actualizarAuto(this.idAuto,this.patente,this.marca,this.asientos,this.fk_idUsuario);
    }
  }
  
  cancelar() {
    this.router.navigate(['/perfil']);
  }
}
