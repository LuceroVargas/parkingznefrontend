import { Routes } from '@angular/router';
import { TiponotificacionComponent } from './components/tiponotificacion/tiponotificacion.component';
import { InsertareditarComponent } from './components/tiponotificacion/insertareditar/insertareditar.component';
import { BuscarComponent } from './components/tiponotificacion/buscar/buscar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';

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
    path:'usuarios',component:UsuarioComponent,
    children:[
      {
        path:'formularioUsuario',component:InsertareditarusuarioComponent
      },
      {
        path:'edicionesUsuario/:id',component:InsertareditarusuarioComponent
      },
     
    ]

  }
];
