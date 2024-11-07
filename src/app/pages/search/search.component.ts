import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { format } from 'date-fns';
import { ConsultService } from '../../services/consult.service';
import { FilterConsultDTO } from '../../model/filterConsultDTO';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  
  form: FormGroup;

  constructor(private consultService: ConsultService){}

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
      this.consultService.searchOthers(filterConsultDTO);
    } else {
      //Option2
      const date1 = format(this.form.value['startDate'], "yyy-MM-dd'T'HH:mm:ss");
      const date2 = format(this.form.value['endDate'], "yyy-MM-dd'T'HH:mm:ss");

      //service
      this.consultService.searchByDates(date1, date2);
    }
  }
}
