import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})
export class RegistroClientePage implements OnInit {
  registroForm: FormGroup;

  usuario = "";
  nombre="";
  apellido = "";
  telefono = "";
  email = "";
  contrasena = "";

  constructor(private router: Router,private toastController: ToastController,private formBuilder: FormBuilder,private db: DbservicioService) {
    this.registroForm = this.formBuilder.group({
      usuario: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\-_]+$/),
        ]),
      ],
      nombre: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])],
      apellido: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])],
      telefono: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]{11}$/),
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
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
      contrasenaRepetida: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    }, {
      validators: this.passwordMatchValidator // Agregar validador personalizado
    });
  }

  ngOnInit() {}

  async guardarCambios() {
    if (this.registroForm.valid) {
      this.db.insertarUsuario(this.usuario,this.nombre,this.apellido,this.telefono,this.email,this.contrasena)
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos correctamente',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  // Validador personalizado para verificar si las contraseñas coinciden
  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('contrasena')!.value;
    const confirmPassword = control.get('contrasenaRepetida')!.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
