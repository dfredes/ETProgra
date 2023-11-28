import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-modificar-datos-cliente',
  templateUrl: './modificar-datos-cliente.page.html',
  styleUrls: ['./modificar-datos-cliente.page.scss'],
})
export class ModificarDatosClientePage implements OnInit {
  registroForm: FormGroup;

  idUsuario="";
  usuario="";
  nombre="";
  apellido="";
  telefono="";
  email="";

  constructor(private router: Router,private toastController: ToastController,private formBuilder: FormBuilder,private activeRoute: ActivatedRoute, private db: DbservicioService) {
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
    this.activeRoute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idUsuario = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuarioEnviado'];
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
        this.apellido = this.router.getCurrentNavigation()?.extras?.state?.['apellidoEnviado'];
        this.telefono = this.router.getCurrentNavigation()?.extras?.state?.['telefonoEnviado'];
        this.email = this.router.getCurrentNavigation()?.extras?.state?.['emailEnviado'];
      }
    })
  }

  ngOnInit() {}

  async actualizarDatos() {
    if (this.registroForm.valid) {
      this.db.actualizarUsuario(this.idUsuario,this.usuario,this.nombre,this.apellido,this.telefono,this.email)
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos correctamente',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    }
  }

  cancelar() {
    this.db.mandarDatosPerfil(this.idUsuario);
  }

  // Validador personalizado para verificar si las contraseñas coinciden
  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('contrasena')!.value;
    const confirmPassword = control.get('contrasenaRepetida')!.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
