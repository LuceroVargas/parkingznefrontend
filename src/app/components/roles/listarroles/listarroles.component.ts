import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { RolService } from '../../../services/roles.service';
import { Rol } from '../../../models/roles';


@Component({
  selector: 'app-listarroles',
  imports: [MatTableModule, MatIconModule,RouterModule],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent {
datasource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['admi1','admin2','admin3','admin4'];

  constructor(private rlS: RolService) {}
  ngOnInit(): void {
    this.rlS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.rlS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });


     delete(id: number) {
    this.rlS.delete(id).subscribe((data) => {
      this.rlS.list().subscribe((data) => {
        this.rlS.setList(data);
      });
    });
  }
  }

  

}
