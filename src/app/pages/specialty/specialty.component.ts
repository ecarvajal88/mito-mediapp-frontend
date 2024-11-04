import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Specialty } from '../../model/specialty';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialtyService } from '../../services/specialty.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialtyDialogComponent } from './specialty-dialog/specialty-dialog.component';
import { SpecialtyDeleteDialogComponent } from './specialty-delete-dialog/specialty-delete-dialog.component';

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.css'
})
export class SpecialtyComponent implements OnInit{

  dataSource: MatTableDataSource<Specialty>;
  columnsDefinitions = [
    { def: 'idSpecialty', label: 'idSpecialty', hide: true},
    { def: 'nameSpecialty', label: 'nameSpecialty', hide: false},
    { def: 'descriptionSpecialty', label: 'descriptionSpecialty', hide: false},
    { def: 'actions', label: 'actions', hide: false}
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private specialtyService: SpecialtyService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.specialtyService.findAll().subscribe(data => this.createTable(data));

    this.specialtyService.getSpecialtyChange().subscribe(data => this.createTable(data));
    this.specialtyService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}));
  }

  createTable(data: Specialty[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  openDialog(specialty?: Specialty){
    this._dialog.open(SpecialtyDialogComponent, {
      width: '750px',
      data: specialty,
      disableClose: true
    });
  }

  delete(id: number){
    this._dialog.open(SpecialtyDeleteDialogComponent, {
      width: '200px',
      data: id
    });
  }
}
