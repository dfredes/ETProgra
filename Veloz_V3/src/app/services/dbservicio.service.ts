import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController,IonItemSliding,Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Comuna } from './comuna';
import { Usuario } from './usuario';
import { Auto } from './auto';
import { Viaje } from './viaje';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IdAuto } from './id-auto';

@Injectable({
  providedIn: 'root'
})
export class DbservicioService {

  public database!: SQLiteObject;

  // -------------------------------------

  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idRol INTEGER PRIMARY KEY AUTOINCREMENT, nombreRol VARCHAR(10) NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idUsuario INTEGER PRIMARY KEY AUTOINCREMENT, usuario VARCHAR(20) NOT NULL, nombre VARCHAR(20) NOT NULL,apellido VARCHAR(20) NOT NULL, telefono INTEGER NOT NULL, email VARCHAR(20) NOT NULL, foto BLOB, contrasena varchar(20) NOT NULL, Fk_idRol INTEGER, FOREIGN KEY (Fk_idRol) REFERENCES rol(idRol));";

  tablaAuto: string = "CREATE TABLE IF NOT EXISTS auto(idAuto INTEGER PRIMARY KEY AUTOINCREMENT, patente VARCHAR(6) NOT NULL, marca VARCHAR(15) NOT NULL, asientos INTEGER NOT NULL, Fk_idUsuario INTEGER, FOREIGN KEY (Fk_idUsuario) REFERENCES usuario(idUsuario));";

  tablaViaje: string = "CREATE TABLE IF NOT EXISTS viaje(idViaje INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(20) NOT NULL, origen VARCHAR(20) NOT NULL, destino VARCHAR(20) NOT NULL, precio INTEGER NOT NULL, salida VARCHAR(5) NOT NULL, descripcion VARCHAR(30) NOT NULL, Fk_idUsuario INTEGER, Fk_idAuto INTEGER, FOREIGN KEY (Fk_idUsuario) REFERENCES usuario(idUsuario), FOREIGN KEY (Fk_idAuto) REFERENCES auto(idAuto));";

  // -------------------------------------------
  
  registroRol1: string = "INSERT or IGNORE INTO rol(idRol,nombreRol) VALUES (1,'usuario');";

  registroRol2: string = "INSERT or IGNORE INTO rol(idRol,nombreRol) VALUES (2,'conductor');";

  registroUsuario1: string = "INSERT or IGNORE INTO usuario(idUsuario,usuario,nombre,apellido,telefono,email,contrasena,Fk_idRol) VALUES(1,'usuario','Juan','Gonzalez',86693556,'jua.gonzalezg@gmail.com','uSu@ri05',1);";

  registroUsuario2: string = "INSERT or IGNORE INTO usuario(idUsuario,usuario,nombre,apellido,telefono,email,contrasena,FK_idRol) VALUES(2,'conductor','Manuel','Gatica',65539668,'conductorg@gmail.com','Con@d0r7',2);";

  registroUsuario3: string = "INSERT or IGNORE INTO usuario(idUsuario,usuario,nombre,apellido,telefono,email,contrasena,FK_idRol) VALUES(3,'toddyflars','Felipe','Galvez',11111111,'Fgalvez@gmail.com','Nacho$20',2);";

  registroAuto1: string = "INSERT or IGNORE INTO auto(idAuto,patente,marca,asientos,Fk_idUsuario) VALUES(1,'ATO121','Audi',4,2);";

  registroAuto2: string = "INSERT or IGNORE INTO auto(idAuto,patente,marca,asientos,Fk_idUsuario) VALUES(2,'AMD450', 'Camaro',2,3);";

  registroViaje1: string = "INSERT OR IGNORE INTO viaje(idViaje,titulo,origen,destino,precio,salida,descripcion,Fk_idUsuario,Fk_idAuto) VALUES (1,'Viaje 1','Plaza Norte','Plaza Quilicura',25000,'12:50','Viaje rapido que tengo que ir a atender unas cosas',2,1);";

  // ----------------------------------------------------------

  listaRol = new BehaviorSubject([]);
  listaUsuario = new BehaviorSubject([]);
  listaAuto = new BehaviorSubject([]);
  listaLugar = new BehaviorSubject([]);
  listaViaje = new BehaviorSubject([]);

  listaUsuarioUnico = new BehaviorSubject([]);
  listaAutoUnico = new BehaviorSubject([]);
  listaViajeUnico = new BehaviorSubject([]);

  listaIdAuto = new BehaviorSubject([]);

  //--------------------------------------------------

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private alertController: AlertController, public sqlite: SQLite, private platform: Platform, private router: Router, private storage: Storage) { 
    this.iniciarStorage();
    this.crearBD();
  }

  async iniciarStorage(){
    await this.storage.create();
  }

  async presentAlert(msj:string){
    const alert = await this.alertController.create({
      header: 'Problemas BD',
      subHeader: 'Error en creacion',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  crearBD(){
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'database2.db',
        location: 'default'
      }).then((db:SQLiteObject)=>{
        this.database = db;
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert("Error en crearBD: " +e);
      })
    })
  }

  //------------------------------------------------------------------------

  async crearTablas(){
    try{
      await this.database.executeSql(this.tablaRol,[]);
      await this.database.executeSql(this.tablaUsuario,[]);
      await this.database.executeSql(this.tablaAuto,[]);
      await this.database.executeSql(this.tablaViaje,[]);


      await this.database.executeSql(this.registroRol1,[]);
      await this.database.executeSql(this.registroRol2,[]);
      await this.database.executeSql(this.registroUsuario1,[]);
      await this.database.executeSql(this.registroUsuario2,[]);
      await this.database.executeSql(this.registroUsuario3,[]);
      await this.database.executeSql(this.registroAuto1,[]);
      await this.database.executeSql(this.registroAuto2,[]);
      await this.database.executeSql(this.registroViaje1,[]);

      this.isDBReady.next(true);
      this.buscarRol();
      this.buscarUsuario();
      this.buscarAuto();
      this.buscarViaje();

      //this.presentAlert3("Tablas creadas exitosamente")

    }catch(e){
      this.presentAlert("Error en crearTablas: " + JSON.stringify(e))
    }
  }

  bdState(){
    return this.isDBReady.asObservable();
  }

  //-----------------------------------------------------------------------

  fetchRol(): Observable<Rol[]>{
    return this.listaRol.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listaUsuario.asObservable();
  }

  fetchAuto(): Observable<Auto[]>{
    return this.listaAuto.asObservable();
  }

  fetchViaje(): Observable<Viaje[]>{
    return this.listaViaje.asObservable();
  }

  //------------------------------------------------------------------------

  fetchUsuarioUnico(): Observable<Usuario[]>{
    return this.listaUsuarioUnico.asObservable();
  }

  fetchAutoUnico(): Observable<Auto[]>{
    return this.listaAutoUnico.asObservable();
  }

  fetchViajeUnico(): Observable<Viaje[]>{
    return this.listaViajeUnico.asObservable();
  }

  fetchIdAuto(): Observable<IdAuto[]>{
    return this.listaIdAuto.asObservable();
  }

  //----------------------------------------------------------------------

  async presentAlert2(msj:string){
    const alert = await this.alertController.create({
      header: 'Problemas CRUD',
      subHeader: 'Error en crud',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert3(msj1:string,msj:string){
    const alert = await this.alertController.create({
      header: msj1,
      subHeader: 'Sin errores',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //----------------------------------------------------------------------

  buscarRol(){
    return this.database.executeSql('SELECT * FROM rol',[]).then(res=>{
      let items: Rol[]=[];
      if(res.rows.length > 0){
        for(var i=0; i < res.rows.length; i++){
          items.push({
            idRol: res.rows.item(i).idRol,
            nombreRol: res.rows.item(i).nombreRol
          })
        }
      }
      this.listaRol.next(items as any);
    })
  }

  buscarUsuario(){
    return this.database.executeSql('SELECT * FROM usuario',[]).then(res=>{
      let items: Usuario[]=[];
      if(res.rows.length > 0){
        for(var i=0; i < res.rows.length; i++){
          items.push({
            idUsuario: res.rows.item(i).idUsuario,
            usuario: res.rows.item(i).usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            telefono: res.rows.item(i).telefono,
            email: res.rows.item(i).email,
            contrasena: res.rows.item(i).contrasena,
            foto: res.rows.item(i).foto,
            fk_idRol: res.rows.item(i).Fk_idRol
          })
        }
      }
      this.listaUsuario.next(items as any);
    })
  }

  buscarAuto(){
    return this.database.executeSql('SELECT * FROM auto',[]).then(res=>{
      let items: Auto[]=[];
      if(res.rows.length > 0){
        for(var i=0; i < res.rows.length; i++){
          items.push({
            idAuto: res.rows.item(i).idAuto,
            patente: res.rows.item(i).patente,
            marca: res.rows.item(i).marca,
            asientos: res.rows.item(i).asientos,
            Fk_idUsuario: res.rows.item(i).Fk_idUsuario
          })
        }
      }
      this.listaAuto.next(items as any);
    })
  }

  buscarViaje(){
    return this.database.executeSql('SELECT * FROM viaje',[]).then(res=>{
      let items: Viaje[]=[];
      if(res.rows.length > 0){
        for(var i=0; i < res.rows.length; i++){
          items.push({
            idViaje: res.rows.item(i).idViaje,
            titulo: res.rows.item(i).titulo,
            origen: res.rows.item(i).origen,
            destino: res.rows.item(i).destino,
            precio: res.rows.item(i).precio,
            salida: res.rows.item(i).salida,
            descripcion: res.rows.item(i).descripcion,
            Fk_idUsuario: res.rows.item(i).Fk_idUsuario,
            Fk_idAuto: res.rows.item(i).Fk_idAuto
          })
        }
      }
      this.listaViaje.next(items as any);
    })
  }

  //----------------------------------------------------------------------------Login

  validarUsuario(usuario:any,contrasena:any){
    return this.database.executeSql('SELECT * from usuario WHERE usuario = ? AND contrasena = ?',[usuario,contrasena]).then(res=>{
      let validacion:Usuario[] = [];
      if(res.rows.length > 0){
        for(var i=0;i < res.rows.length; i++){
          validacion.push({
            idUsuario: res.rows.item(i).idUsuario,
            usuario: res.rows.item(i).usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            telefono: res.rows.item(i).telefono,
            email: res.rows.item(i).email,
            contrasena: res.rows.item(i).contrasena,
            foto: res.rows.item(i).foto,
            fk_idRol: res.rows.item(i).Fk_idRol
          })
          if(validacion[i].fk_idRol == '1'){
            let navigationExtras: NavigationExtras = {
              state: {
                idUsuario: validacion[i].idUsuario,
                fk_idRol: validacion[i].fk_idRol
              }
            }
            this.router.navigate(['/home'],navigationExtras)

          } else if (validacion[i].fk_idRol == '2'){
            let navigationExtras: NavigationExtras = {
              state: {
                idUsuario: validacion[i].idUsuario,
                fk_idRol: validacion[i].fk_idRol
              }
            }
            this.router.navigate(['/home'],navigationExtras)
            this.presentAlert3("Inicio de Sesion","Inicio de Sesion Con exito")

          } else {
            this.presentAlert("Usuario o Contrasena no existen")
          }
        }
      }
    })
  }

  mandarDatosPerfil(idUsuario:any){
    return this.database.executeSql('SELECT * FROM usuario WHERE idUsuario = ?',[idUsuario]).then((res)=>{
      let usuario:Usuario[]=[];
      if(res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          usuario.push({
            idUsuario: res.rows.item(i).idUsuario,
            usuario: res.rows.item(i).usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            telefono: res.rows.item(i).telefono,
            email: res.rows.item(i).email,
            contrasena: res.rows.item(i).contrasena,
            foto: res.rows.item(i).foto,
            fk_idRol: res.rows.item(i).Fk_idRol
          })
          if(usuario[i].fk_idRol == '1'){
            this.listaUsuarioUnico.next(usuario as any);
            this.router.navigate(['/perfil-cliente']);
          }
          else if(usuario[i].fk_idRol == '2'){
            this.listaUsuarioUnico.next(usuario as any);
            this.mandarDatosAuto(idUsuario)
            this.router.navigate(['/perfil']);
          }
        }
      }
    })
  }

  mandarDatosUsuario(idUsuario:any){
    return this.database.executeSql('SELECT * FROM usuario WHERE idUsuario = ?',[idUsuario]).then((res)=>{
      let usuario: Usuario[]=[];
      if(res.rows.length > 0){
        for (var i = 0; i < res.rows.length; i++){
          usuario.push({
            idUsuario: res.rows.item(i).idUsuario,
            usuario: res.rows.item(i).usuario,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            telefono: res.rows.item(i).telefono,
            email: res.rows.item(i).email,
            contrasena: res.rows.item(i).contrasena,
            foto: res.rows.item(i).foto,
            fk_idRol: res.rows.item(i).Fk_idRol
          })
        }
      }
      this.listaUsuarioUnico.next(usuario as any);
    })
  }

  mandarDatosViaje(idViaje:any){
    return this.database.executeSql('SELECT * FROM viaje WHERE idViaje = ?',[idViaje]).then((res)=>{
      let viaje: Viaje[]=[];
      if(res.rows.length > 0){
        for (var i = 0; i < res.rows.length; i++){
          viaje.push({
            idViaje: res.rows.item(i).idViaje,
            titulo: res.rows.item(i).titulo,
            origen: res.rows.item(i).origen,
            destino: res.rows.item(i).destino,
            precio: res.rows.item(i).precio,
            salida: res.rows.item(i).salida,
            descripcion: res.rows.item(i).descripcion,
            Fk_idUsuario: res.rows.item(i).Fk_idUsuario,
            Fk_idAuto: res.rows.item(i).Fk_idAuto
          })
          this.listaViajeUnico.next(viaje as any);
          this.mandarDatosUsuario(viaje[i].Fk_idUsuario)
          this.mandarDatosAuto(viaje[i].Fk_idUsuario)
          this.router.navigate(['/interfaz-viaje']);
        }
      }
    })
  }

  mandarDatosAuto(idUsuario:any){
    return this.database.executeSql('SELECT * FROM auto WHERE Fk_idUsuario = ?',[idUsuario]).then((res)=>{
      let auto:Auto[] = [];
      if(res.rows.length > 0){
        for (var i = 0; i < res.rows.length; i++){
          auto.push({
            idAuto: res.rows.item(i).idAuto,
            patente: res.rows.item(i).patente,
            marca: res.rows.item(i).marca,
            asientos: res.rows.item(i).asientos,
            Fk_idUsuario: res.rows.item(i).Fk_idUsuario
          })
        }
      }
      this.listaAutoUnico.next(auto as any);
    })
  }

  mandarDatosIdAuto(idUsuario:any){
    return this.database.executeSql('SELECT idAuto from auto WHERE Fk_idUsuario = ?',[idUsuario]).then((res)=>{
      let idAuto:IdAuto[]=[];
      if (res.rows.length > 0){
        for(var i = 0; i < res.rows.length;i++){
          idAuto.push({
            idAuto: res.rows.item(i).idAuto
          })
        }
      }
      this.listaIdAuto.next(idAuto as any);
    })
  }

  //----------------------------------------------------------------------------Crear

  insertarAuto(patente:any,marca:any,asientos:any,Fk_idUsuario:any){
    return this.database.executeSql('INSERT INTO auto(patente,marca,asientos,Fk_idUsuario) VALUES (?,?,?,?)',[patente,marca,asientos,Fk_idUsuario]).then(res=>{
      this.buscarAuto();
      this.actualizarRolUsuario(Fk_idUsuario);
    })
  }

  insertarViaje(titulo:any,origen:any,destino:any,precio:any,salida:any,descripcion:any,Fk_idUsuario:any,Fk_idAuto:any){
    return this.database.executeSql('INSERT INTO viaje(titulo,origen,destino,precio,salida,descripcion,Fk_idUsuario,Fk_idAuto) VALUES (?,?,?,?,?,?,?,?)',[titulo,origen,destino,precio,salida,descripcion,Fk_idUsuario,Fk_idAuto]).then(res=>{
      this.buscarViaje();
      this.presentAlert3("Creado","Viaje Creado")
    })
  }

  insertarUsuario(usuario:any,nombre:any,apellido:any,telefono:any,email:any,contrasena:any){
    return this.database.executeSql('INSERT INTO usuario(usuario,nombre,apellido,telefono,email,contrasena,Fk_idRol) VALUES (?,?,?,?,?,?,1)',[usuario,nombre,apellido,telefono,email,contrasena]).then(res=>{
      this.buscarUsuario();
      this.presentAlert3("Bienvenido","Usuario Registrado")
      this.router.navigate(['/']);
    })
  }

  //----------------------------------------------------------------------------------Actualizar

  actualizarRolUsuario(idUsuario:any){
    return this.database.executeSql('UPDATE usuario SET fk_idRol = 2 WHERE idUsuario = ?',[idUsuario]).then(res=>{
      this.buscarUsuario();
      this.presentAlert3("Auto Añadido","Vehiculo añadido con exito");
      this.mandarDatosPerfil(idUsuario);
    })
  }

  actualizarUsuario(idUsuario:any,usuario:any,nombre:any,apellido:any,telefono:any,email:any){
    return this.database.executeSql('UPDATE usuario set usuario = ?, nombre = ?, apellido = ?, telefono = ?, email = ? WHERE idUsuario = ?',[usuario,nombre,apellido,telefono,email,idUsuario]).then(res=>{
      this.buscarUsuario();
      this.mandarDatosPerfil(idUsuario);
      this.presentAlert3("Datos actualizados","Perfil actualizado");
    })
  }

  actualizarAuto(idAuto:any,patente:any,marca:any,asientos:any,fk_idRol:any){
    return this.database.executeSql('UPDATE auto set patente = ?, marca = ?,asientos = ? WHERE idAuto = ?',[patente,marca,asientos,idAuto]).then(res=>{
      this.buscarAuto();
      this.mandarDatosAuto(fk_idRol);
      this.mandarDatosPerfil(fk_idRol);
      this.presentAlert3("Auto Actualizado","Los datos del vehiculo se actualizaron con exito")
    })
  }

  actualizarViaje(idViaje:any,titulo:any,origen:any,destino:any,precio:any,salida:any,descripcion:any){
    return this.database.executeSql('UPDATE viaje set titulo = ? ,origen = ?, destino = ?, precio = ?, salida = ?, descripcion = ? WHERE idViaje = ?',[titulo,origen,destino,precio,salida,descripcion,idViaje]).then(res=>{
      this.buscarViaje();
      this.presentAlert3("Viaje Actualizado","Los datos del viaje se cambiaron con exito");
    })
  }

  actualizarClave(contrasena:any,idUsuario:any){
    return this.database.executeSql('UPDATE usuario SET contrasena = ? WHERE idUsuario = ?',[contrasena,idUsuario]).then(res=>{
      this.buscarUsuario();
      this.router.navigate(['/']);
      this.presentAlert3("Contraseña actualizada","porfavor vuelva a iniciar sesion")
    })
  }

  actualizarFoto(image:any,idUsuario:any){
    return this.database.executeSql('UPDATE usuario SET foto = ? where idUsuario = ?',[image,idUsuario]).then(res=>{
      this.buscarUsuario();
      this.mandarDatosPerfil(idUsuario);
      this.presentAlert3("Foto de Perfil añadida","Se añadio la foto con exito")
    })
  }

  //------------------------------------------------------------------------------------Eliminar

  eliminarViaje(idViaje:any){
    return this.database.executeSql('DELETE FROM viaje WHERE idViaje = ?',[idViaje]).then(res=>{
      this.buscarViaje();
      this.presentAlert3("Viaje Eliminado","El viaje fue eliminado con exito");
    })
  }
  
}