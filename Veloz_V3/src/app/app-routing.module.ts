import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'interfaz-viaje',
    loadChildren: () => import('./pages/interfaz-viaje/interfaz-viaje.module').then( m => m.InterfazViajePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil-cliente',
    loadChildren: () => import('./pages/perfil-cliente/perfil-cliente.module').then( m => m.PerfilClientePageModule)
  },
  {
    path: 'modificar-datos-cliente',
    loadChildren: () => import('./pages/modificar-datos-cliente/modificar-datos-cliente.module').then( m => m.ModificarDatosClientePageModule)
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./pages/registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  },
  {
    path: 'modificar-auto',
    loadChildren: () => import('./pages/modificar-auto/modificar-auto.module').then( m => m.ModificarAutoPageModule)
  },
  {
    path: 'restablecer-contrasena',
    loadChildren: () => import('./pages/restablecer-contrasena/restablecer-contrasena.module').then( m => m.RestablecerContrasenaPageModule)
  },
  {
    path: 'crear-viajes',
    loadChildren: () => import('./pages/crear-viajes/crear-viajes.module').then( m => m.CrearViajesPageModule)
  },
  {
    path: 'modificar-viajes',
    loadChildren: () => import('./pages/modificar-viajes/modificar-viajes.module').then( m => m.ModificarViajesPageModule)
  },
  {
    path: 'anadir-auto',
    loadChildren: () => import('./pages/anadir-auto/anadir-auto.module').then( m => m.AnadirAutoPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
