import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicService } from '../../../services/medic.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medic-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './medic-delete-dialog.component.html',
  styleUrl: './medic-delete-dialog.component.css'
})
export class MedicDeleteDialogComponent implements OnInit{
  id: number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: number,
  private _dialogRef: MatDialogRef<MedicDeleteDialogComponent>,
  private medicService: MedicService){}

  ngOnInit(): void {
      this.id = this.data;
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.id != null && this.id > 0){
      this.medicService.delete(this.id)
      .pipe(switchMap( () => this.medicService.findAll()))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('DELETED!');
      });
    }

    this.close();
  }
}
