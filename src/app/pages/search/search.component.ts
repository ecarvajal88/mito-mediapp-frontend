import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { format } from 'date-fns';
import { ConsultService } from '../../services/consult.service';
import { FilterConsultDTO } from '../../model/filterConsultDTO';
import { Consult } from '../../model/consult';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe, LowerCasePipe, DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  
  form: FormGroup;
  message: string;
  dataSource: MatTableDataSource<Consult>;
  displayedColumns = ['patient', 'medic', 'date', 'actions'];

  constructor(
    private consultService: ConsultService,
    private _dialog: MatDialog
  ){}

  ngOnInit(): void {
      this.form = new FormGroup({
        dni: new FormControl(),
        fullname: new FormControl(),
        startDate: new FormControl(),
        endDate: new FormControl()
      })
  }

  search(){
    if(this.tabGroup.selectedIndex == 0){
      //Option1
      const dni = this.form.value['dni'];
      const fullname = this.form.value['fullname']?.toLowerCase();

      //service
      const filterConsultDTO : FilterConsultDTO = new FilterConsultDTO(dni, fullname);
      this.consultService.searchOthers(filterConsultDTO).subscribe(data => this.createTable(data));
    } else {
      //Option2
      const date1 = format(this.form.value['startDate'], "yyy-MM-dd'T'HH:mm:ss");
      const date2 = format(this.form.value['endDate'], "yyy-MM-dd'T'HH:mm:ss");

      //service
      this.consultService.searchByDates(date1, date2).subscribe(data => this.createTable(data));
    }
  }

  createTable(data: Consult[]){
    if(data.length === 0){
      this.message = "No data found";
    }else{
      this.message = null;
      this.dataSource = new MatTableDataSource(data);
    }
  }
  
  viewDetails(consult: Consult){
    this._dialog.open(SearchDialogComponent, {
      width: '750px',
      data: consult
    })
  }
}
