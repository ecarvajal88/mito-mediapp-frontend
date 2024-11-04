import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { SpecialtyService } from '../../../services/specialty.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './specialty-delete-dialog.component.html',
  styleUrl: './specialty-delete-dialog.component.css'
})
export class SpecialtyDeleteDialogComponent implements OnInit{
  id: number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: number,
  private _dialogRef: MatDialogRef<SpecialtyDeleteDialogComponent>,
  private specialtyService: SpecialtyService){}

  ngOnInit(): void {
      this.id = this.data;
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.id != null && this.id > 0){
      this.specialtyService.delete(this.id)
      .pipe(switchMap( () => this.specialtyService.findAll()))
      .subscribe(data => {
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange('DELETED!');
      });
    }

    this.close();
  }
}
