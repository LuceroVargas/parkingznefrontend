import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3', 'c4', 'c5', 'c6','c7', 'c8', 'c9', 'c10','c11', 'c12']
  constructor(private uS: UsuarioService) { }
}
