import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit{

  IdUsuario: any;

  usuario: any;

  auto: any;

  image: any;

  constructor(private alertController: AlertController, private router: Router, private activedRouter: ActivatedRoute, private db: DbservicioService) { }

  ngOnInit() {
    this.IdUsuario = localStorage.getItem('idUsuario')
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchUsuarioUnico().subscribe(datos=>{
          this.usuario = datos;
        })
        this.db.fetchAutoUnico().subscribe(datos=>{
          this.auto = datos;
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
    this.router.navigate(['/modificar-datos-cliente'],navigationExtras)
  }

  editarvehiculo(y:any){
    let navigationExtras : NavigationExtras = {
      state: {
        idEnviado: y.idAuto,
        patenteEnviado: y.patente,
        marcaEnviado: y.marca,
        asientosEnviado: y.asientos,
        fk_idUsuario: y.Fk_idUsuario
      }
    }
    this.router.navigate(['/modificar-auto'],navigationExtras)
  }

  takePicture = async () =>{
    const image2 = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    
    this.image = image2.dataUrl;
    this.db.actualizarFoto(this.image,this.IdUsuario)
  }

}
