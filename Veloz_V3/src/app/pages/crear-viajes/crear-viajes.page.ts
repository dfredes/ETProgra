import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-crear-viajes',
  templateUrl: './crear-viajes.page.html',
  styleUrls: ['./crear-viajes.page.scss'],
})
export class CrearViajesPage implements OnInit {

  tituloControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]);
  origenControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]);
  destinoControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]);
  precioControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
  horaSalidaControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9:]*$/)]);
  descripcionControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]);

  titulo = "";
  origen = "";
  destino = "";
  precio = "";
  salida = "";
  descripcion = "";

  idAuto:any;
  idUsuario:any;

  constructor(private router: Router, private alertController: AlertController, private db: DbservicioService) { }

  ngOnInit() {
    this.idUsuario = localStorage.getItem('idUsuario')
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchIdAuto().subscribe(datos=>{
          this.idAuto = datos;
        })
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viaje Creado',
      message: 'Acabas de publicar un viaje',
      buttons: ['OK'],
    });

    await alert.present();
  }

  cancelar() {
    this.router.navigate(['/home']);
  }

  CrearViaje() {
    if (this.tituloControl &&this.origenControl.valid && this.destinoControl.valid &&
        this.precioControl.valid && this.horaSalidaControl.valid &&
        this.descripcionControl.valid) {
      // Todas las validaciones pasaron, puedes continuar con la creación del viaje.
      this.db.insertarViaje(this.titulo,this.origen,this.destino,this.precio,this.salida,this.descripcion,this.idUsuario,this.idAuto);
      this.router.navigate(['/home']);
    } else {
      // Mostrar un mensaje de error o realizar alguna acción en caso de que las validaciones no pasen.
      // Por ejemplo, puedes mostrar un mensaje de error genérico.
      console.log('Error en el formulario. Verifica los campos.');
    }
  }
}
