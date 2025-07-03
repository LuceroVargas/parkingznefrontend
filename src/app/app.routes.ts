import { Routes } from '@angular/router';
import { TiponotificacionComponent } from './components/tiponotificacion/tiponotificacion.component';
import { InsertareditarComponent } from './components/tiponotificacion/insertareditar/insertareditar.component';
import { BuscarComponent } from './components/tiponotificacion/buscar/buscar.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { ListarempresaComponent } from './components/empresa/listarempresa/listarempresa.component';
import { InsertarempresaComponent } from './components/empresa/insertarempresa/insertarempresa.component';
import { BuscarempresaComponent } from './components/empresa/buscarempresa/buscarempresa.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarsuscripcionComponent } from './components/suscripcion/insertareditarsuscripcion/insertareditarsuscripcion.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';
import { ListarsuscripcionComponent } from './components/suscripcion/listarsuscripcion/listarsuscripcion.component';
import { ListarusuarioComponent } from './components/usuario/listarusuario/listarusuario.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { ListarnotificacionComponent } from './components/notificacion/listarnotificacion/listarnotificacion.component';
import { RegistrarnotificacionComponent } from './components/notificacion/registrarnotificacion/registrarnotificacion.component';

export const routes: Routes = [
  {
    path:'',redirectTo:'tiponotificaciones',pathMatch:'full'
  },
  {
    path:'tiponotificaciones',component:TiponotificacionComponent,
    children:[
      {
        path:'formulario',component:InsertareditarComponent
      },
      {
        path:'ediciones/:id',component:InsertareditarComponent
      },
      {
        path:'busquedasproveedor',component:BuscarComponent
      }

    ]
  },

  {
  path: 'empresas',
  component: EmpresaComponent,
  children: [
    { path: 'listar', component: ListarempresaComponent },
    { path: 'insertar', component: InsertarempresaComponent},
    { path:'buscarempresaporid',component:BuscarempresaComponent},
    { path:'modificar',component:InsertarempresaComponent},
    { path:'eliminar',component:ListarnotificacionComponent }
  ]
},

  {
    path:'usuarios',component:UsuarioComponent,
    children:[

      { 
        path: 'listar', component: ListarusuarioComponent },
      {
        path:'formularioUsuario',component:InsertareditarusuarioComponent
      },
      {
        path:'edicionesUsuario/:id',component:InsertareditarusuarioComponent
      },
     
    ]

  },
  {
    path:'suscripciones',component:SuscripcionComponent,
    children:[
      { 
        path: 'listar', component: ListarsuscripcionComponent },
      {
        path:'formularioSuscripcion',component:InsertareditarsuscripcionComponent
      },
      {
        path:'edicionesSuscripcion/:id',component:InsertareditarsuscripcionComponent
      },
     
    ]

  },


  
   {
    path:'notificacion',component:NotificacionComponent,
    children:[

      { 
        path: 'listar', component: ListarnotificacionComponent },
      {
        path:'registrar',component:RegistrarnotificacionComponent
      },
      
       {
        path:'buscarporid',component:RegistrarnotificacionComponent
      },
      {
        path:'modificar',component:RegistrarnotificacionComponent
      },

     {
        path:'eliminar',component:ListarnotificacionComponent
      },
    ]

  },




];
