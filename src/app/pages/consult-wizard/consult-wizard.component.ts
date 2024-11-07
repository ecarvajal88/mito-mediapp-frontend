import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ConsultDetail } from '../../model/consultDetail';
import { Exam } from '../../model/exam';
import { ExamService } from '../../services/exam.service';
import { Medic } from '../../model/medic';
import { MedicService } from '../../services/medic.service';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Consult } from '../../model/consult';
import { format } from 'date-fns';
import { ConsultListExamDTOI } from '../../model/ConsultListExamDTOI';
import { ConsultService } from '../../services/consult.service';

@Component({
  selector: 'app-consult-wizard',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, AsyncPipe, FlexLayoutModule],
  templateUrl: './consult-wizard.component.html',
  styleUrl: './consult-wizard.component.css'
})
export class ConsultWizardComponent implements OnInit {

  firstFormGroup: FormGroup;
  //patients: Patient[] = [];
  patients$: Observable<Patient[]>;
  minDate: Date = new Date();
  details: ConsultDetail[] = [];

  exams: Exam[] = [];
  examsFiltered$: Observable<Exam[]>;
  examControl: FormControl = new FormControl();
  examSelected: Exam[] = [];

  medics: Medic[] = [];
  medicSelected: Medic;

  consultArray: number[] = [];
  consultSelected: number;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private patientService: PatientService,
    private examService: ExamService,
    private medicService: MedicService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      patient: new FormControl(),
      consultDate: new FormControl(new Date()),
      exam: this.examControl,
      diagnosis: new FormControl(''),
      treatment: new FormControl(''),
    });
      this.loadInitialData();

      this.examsFiltered$ = this.examControl.valueChanges.pipe(map(val => this.filterExams(val)));
  }

  filterExams(val: any){
    if (val?.idExam > 0) {
      return this.exams.filter(
        (el) =>
          el.nameExam.toLowerCase().includes(val.nameExam.toLowerCase()) ||
          el.descriptionExam.toLowerCase().includes(val.descriptionExam.toLowerCase())
      );
    } else {
      return this.exams.filter(
        (el) =>
          el.nameExam.toLowerCase().includes(val?.toLowerCase()) ||
          el.descriptionExam.toLowerCase().includes(val?.toLowerCase())
      );
    }
  }

  showExam(val: any){
    return val ? val.nameExam : val;
  }

  loadInitialData(){
    //this.patientService.findAll().subscribe(data => this.patients = data);
    this.patients$ = this.patientService.findAll();
    this.examService.findAll().subscribe(data => this.exams = data);
    this.medicService.findAll().subscribe(data => this.medics = data);

    for(let i = 1; i<=100; i++){
      this.consultArray.push(i);
    }
  }

  getDate(e: any){
    console.log(e);
  }

  addDetail(){
    const det = new ConsultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index: number){
    this.details.splice(index, 1);
  }

  addExam(){
    const tmpExam: Exam = this.firstFormGroup.value['exam'];

    this.examSelected.push(tmpExam);
  }

  selectMedic(m: Medic){
    this.medicSelected = m;
  }

  selectConsult(n: number){
    this.consultSelected = n;
  }

  nextManualStep(){
    if(this.consultSelected > 0){
      //next step
      this.stepper.next();
    }else{
      this._snackBar.open('Please select a consult number', 'INFO', {duration: 2000})
    }
  }

  get f(){
    return this.firstFormGroup.controls;
  }

  save(){
    const consult = new Consult();
    consult.patient = this.firstFormGroup.value['patient'];
    consult.medic = this.medicSelected;
    consult.details = this.details;
    consult.numConsult = `C${this.consultSelected}`;
    consult.idUser = 1;
    consult.consultDate = format(this.firstFormGroup.value['consultDate'], "yyyy-MM-dd'T'HH:mm:ss");

    const dto: ConsultListExamDTOI = {
      consult: consult,
      lstExam: this.examSelected
    }

    this.consultService.saveTransactional(dto).subscribe( ()=> {
      this._snackBar.open('CREATED!', 'INFO', {duration: 2000});

      setTimeout( ()=> {
        this.cleanControls();
      }, 2000)
    });
  }

  cleanControls(){
    this.firstFormGroup.reset();
    this.stepper.reset();
    this.details = [];
    this.examSelected = [];
    this.consultSelected = 0;
    this.medicSelected = null;
  }
}
