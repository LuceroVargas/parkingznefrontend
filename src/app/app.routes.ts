import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';
import { InsertareditarsuscripcionComponent } from './components/suscripcion/insertareditarsuscripcion/insertareditarsuscripcion.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarrolComponent } from './components/rol/insertareditarrol/insertareditarrol.component';
import { BuscarusuarioComponent } from './components/usuario/buscarusuario/buscarusuario.component';

export const routes: Routes = [
  {
    path:'',redirectTo:'usuarios',pathMatch:'full'
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
      {
        path:'busquedasPlaca',component:BuscarusuarioComponent
      },
    ]
  },
  {
    path:'suscripciones',component:SuscripcionComponent,
    children:[
      {
        path:'formularioSuscripcion',component:InsertareditarsuscripcionComponent
      },
      {
        path:'edicionesSuscripcion/:id',component:InsertareditarsuscripcionComponent
      },
     
    ]

  },
    {
    path:'roles',component:RolComponent,
    children:[
      {
        path:'formularioRol',component:InsertareditarrolComponent
      },
      {
        path:'edicionesRol/:id',component:InsertareditarrolComponent
      },
    ]
  },
];
