import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from '../services/dbservicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  idUsuarioRecibido: any;
  idRolRecibido: any;
  idAutoRecibido:any;

  viajes: any;

  constructor(private router:Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private db: DbservicioService, private activeRoute: ActivatedRoute ) { 
    this.activeRoute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idUsuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['idUsuario'];
        this.idRolRecibido = this.router.getCurrentNavigation()?.extras?.state?.['fk_idRol'];
      }
      localStorage.setItem('idUsuario',this.idUsuarioRecibido);
    })
  }

  ngOnInit(){
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchViaje().subscribe(datos=>{
          this.viajes = datos;
        })
        this.db.fetchAutoUnico().subscribe(datos=>{
          this.idAutoRecibido = datos;
        })
      }
    })
  }

  irInterfazViaje(bd:any){
    this.db.mandarDatosViaje(bd.idViaje);
  }

  crearViaje(){
    this.db.mandarDatosIdAuto(this.idUsuarioRecibido)
    this.router.navigate(['/crear-viajes']);
  }

  eliminarViaje(bd:any){
    this.db.eliminarViaje(bd.idViaje);
  }

  editarViaje(bd:any){
    let navigationExtras : NavigationExtras = {
      state: {
        idEnviado: bd.idViaje,
        tituloEnviado: bd.titulo,
        origenEnviado: bd.origen,
        destinoEnviado: bd.destino,
        precioEnviado: bd.precio,
        salidaEnviado: bd.salida,
        descripcionEnviado: bd.descripcion
      }
    }
    this.router.navigate(['/modificar-viajes'],navigationExtras);
  }

  irPerfil(){
    this.db.mandarDatosPerfil(this.idUsuarioRecibido)
  }

}