import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage implements OnInit{
  registroForm: FormGroup;

  idUsuario:any;

  nuevaContrasena = "";

  constructor(private router: Router,private formBuilder: FormBuilder,private alertController: AlertController,private db: DbservicioService) {
    this.registroForm = this.formBuilder.group({
      nuevaContrasena: ['',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),])],
      nuevaContrasenaRepetida: ['',Validators.compose([Validators.required,]),],
    }, {
      validators: this.passwordMatchValidator // Agregar validador personalizado
    });
  }

  ngOnInit() {
    this.idUsuario = localStorage.getItem('idUsuario')
  }

  async CambiarContrasena() {
    if (this.registroForm.valid){
      this.db.actualizarClave(this.nuevaContrasena,this.idUsuario);
    }else {
      this.mostrarMensajeExito("Las contrasenas no coinciden");
    }
  }

  async mostrarMensajeExito(msg:string) {
    const alert = await this.alertController.create({
      header: 'Contraseñas no coinciden',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('nuevaContrasena')!.value;
    const confirmPassword = control.get('nuevaContrasena')!.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
