import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-modificar-viajes',
  templateUrl: './modificar-viajes.page.html',
  styleUrls: ['./modificar-viajes.page.scss'],
})
export class ModificarViajesPage implements OnInit {

  origenControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]);
  destinoControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]);
  precioControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]);
  horaSalidaControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9:]*$/)]);
  descripcionControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]);

  idViaje = "";
  titulo = "";
  origen = "";
  destino = "";
  precio = "";
  salida = "";
  descripcion = "";

  constructor(private router: Router, private alertController: AlertController, private activeRoute: ActivatedRoute, private db: DbservicioService) {
    this.activeRoute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idViaje = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.titulo = this.router.getCurrentNavigation()?.extras?.state?.['tituloEnviado'];
        this.origen = this.router.getCurrentNavigation()?.extras?.state?.['origenEnviado'];
        this.destino = this.router.getCurrentNavigation()?.extras?.state?.['destinoEnviado'];
        this.precio = this.router.getCurrentNavigation()?.extras?.state?.['precioEnviado'];
        this.salida = this.router.getCurrentNavigation()?.extras?.state?.['salidaEnviado'];
        this.descripcion = this.router.getCurrentNavigation()?.extras?.state?.['descripcionEnviado'];
      }
    })
  }

  ngOnInit() {
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
    if (this.origenControl.valid && this.destinoControl.valid &&
        this.precioControl.valid && this.horaSalidaControl.valid &&
        this.descripcionControl.valid) {
      // Todas las validaciones pasaron, puedes continuar con la creación del viaje.
      this.db.actualizarViaje(this.idViaje,this.titulo,this.origen,this.destino,this.precio,this.salida,this.descripcion);
      this.router.navigate(['/home']);
    } else {
      // Mostrar un mensaje de error o realizar alguna acción en caso de que las validaciones no pasen.
      // Por ejemplo, puedes mostrar un mensaje de error genérico.
      console.log('Error en el formulario. Verifica los campos.');
    }
  }
}
