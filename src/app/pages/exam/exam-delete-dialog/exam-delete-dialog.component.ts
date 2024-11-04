import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamService } from '../../../services/exam.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-exam-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './exam-delete-dialog.component.html',
  styleUrl: './exam-delete-dialog.component.css'
})
export class ExamDeleteDialogComponent implements OnInit{
  id: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: number,
    private _dialogRef: MatDialogRef<ExamDeleteDialogComponent>,
    private examService: ExamService
  ){}

  ngOnInit(): void {
      this.id = this.data;
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.id != null && this.id > 0){
      this.examService.delete(this.id)
      .pipe(switchMap( () => this.examService.findAll()))
      .subscribe(data => {
        this.examService.setExamChange(data);
        this.examService.setMessageChange('DELETED!');
      });
    }

    this.close();
  }
}
