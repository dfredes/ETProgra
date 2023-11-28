import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.page.html',
  styleUrls: ['./perfil-cliente.page.scss'],
})
export class PerfilClientePage implements OnInit {

  usuario: any;

  IdUsuario: any;

  constructor(private alertController: AlertController, private router: Router, private db:DbservicioService, private activedRouter: ActivatedRoute) { }
  
  ngOnInit() {
    this.IdUsuario = localStorage.getItem('idUsuario')
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchUsuarioUnico().subscribe(datos=>{
          this.usuario = datos;
        })
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sesion Cerrada',
      message: 'Su sesion se cerro con exito',
      buttons: ['OK'],
    });

    await alert.present();
  }

  cerrarSesion(){
    this.presentAlert();
    this.router.navigate(['/login']);
  }

  editarInformacion(x:any){
    let navigationExtras : NavigationExtras = {
      state: {
        idEnviado: x.idUsuario,
        usuarioEnviado: x.usuario,
        nombreEnviado: x.nombre,
        apellidoEnviado: x.apellido,
        telefonoEnviado: x.telefono,
        emailEnviado: x.email
      }
    }
    this.router.navigate(['/modificar-datos-cliente'],navigationExtras);
  }

  anadirAuto(){
    this.router.navigate(['/anadir-auto'])
  }

}
