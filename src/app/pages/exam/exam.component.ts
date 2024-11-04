import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Exam } from '../../model/exam';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExamService } from '../../services/exam.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';
import { ExamDeleteDialogComponent } from './exam-delete-dialog/exam-delete-dialog.component';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit{

  dataSource: MatTableDataSource<Exam>;
  columnsDefinitions = [
    { def: 'idExam', label: 'idExam', hide: true},
    { def: 'nameExam', label: 'nameExam', hide: false},
    { def: 'descriptionExam', label: 'descriptionExam', hide: false},
    { def: 'actions', label: 'actions', hide: false}
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private examService: ExamService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.examService.findAll().subscribe(data => this.createTable(data));

    this.examService.getExamChange().subscribe(data => this.createTable(data));
    this.examService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}));
  }

  createTable(data: Exam[]){
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

  openDialog(specialty?: Exam){
    this._dialog.open(ExamDialogComponent, {
      width: '750px',
      data: specialty,
      disableClose: true
    });
  }

  delete(id: number){
    this._dialog.open(ExamDeleteDialogComponent, {
      width: '200px',
      data: id
    });
  }
}
