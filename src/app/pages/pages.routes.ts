import { Routes } from "@angular/router";
import { MedicComponent } from "./medic/medic.component";
import { PatientEditComponent } from "./patient/patient-edit/patient-edit.component";
import { PatientComponent } from "./patient/patient.component";
import { ExamComponent } from "./exam/exam.component";
import { SpecialtyComponent } from "./specialty/specialty.component";
import { ConsultWizardComponent } from "./consult-wizard/consult-wizard.component";
import { SearchComponent } from "./search/search.component";
import { ReportComponent } from "./report/report.component";

export const pagesRoutes: Routes = [
    { path: 'patient', component: PatientComponent, children: [
        {path: 'new', component: PatientEditComponent},
        {path: 'edit/:id', component: PatientEditComponent}
    ]},
    { path: 'medic', component: MedicComponent},
    { path: 'exam', component: ExamComponent},
    { path: 'specialty', component: SpecialtyComponent},
    { path: 'consult-wizard', component: ConsultWizardComponent},
    { path: 'search', component: SearchComponent},
    { path: 'report', component: ReportComponent}
]