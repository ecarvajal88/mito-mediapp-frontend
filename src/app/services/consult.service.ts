import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ConsultListExamDTOI } from '../model/ConsultListExamDTOI';
import { FilterConsultDTO } from '../model/filterConsultDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private url: string = `${environment.HOST}/consults`;
  
  constructor(private http: HttpClient) { }

  saveTransactional(dto: ConsultListExamDTOI){
    return this.http.post(this.url, dto);
  }

  searchByDates(date1: string, date2: string){

  }

  searchOthers(dto: FilterConsultDTO){

  }
}
