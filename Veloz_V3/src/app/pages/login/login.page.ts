import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  roles: any = [{
    idRol: '',
    nombreRol: ''
  }]

  constructor(private formBuilder: FormBuilder, private router: Router, private toastController: ToastController, private db: DbservicioService, private alertController: AlertController) {
    this.loginForm = this.formBuilder.group({
      usuario: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/), // Solo letras permitidas
        ]),
      ],
      contrasena: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        ]),
      ],
    });
  }
  
  
  async ingresar() {
    if (this.loginForm.valid) {
      const usuarioControl = this.loginForm.get('usuario');
      const contrasenaControl = this.loginForm.get('contrasena');
  
      if (usuarioControl && contrasenaControl) {
        const usuario = usuarioControl.value as string;
        const contrasena = contrasenaControl.value as string;
  
        // Luego, puedes continuar con la lógica de inicio de sesión
        this.db.validarUsuario(usuario,contrasena)
      }
      else {
      this.presentAlert();
      }
    }  
  }

  registroCliente() {
    this.router.navigate(['/registro-cliente']);
  }

  ngOnInit(){
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchRol().subscribe(datos=>{
          this.roles = datos;
        })
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Usuario o contrasena incorrectos, intente nuevamente',
      buttons: ['OK'],
    });

    await alert.present();
  }
}