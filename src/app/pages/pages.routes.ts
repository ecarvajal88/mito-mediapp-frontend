import { Routes } from "@angular/router";
import { MedicComponent } from "./medic/medic.component";
import { PatientEditComponent } from "./patient/patient-edit/patient-edit.component";
import { PatientComponent } from "./patient/patient.component";
import { ExamComponent } from "./exam/exam.component";
import { SpecialtyComponent } from "./specialty/specialty.component";
import { ConsultWizardComponent } from "./consult-wizard/consult-wizard.component";
import { SearchComponent } from "./search/search.component";
import { ReportComponent } from "./report/report.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { certGuard } from "../guard/cert.guard";
import { Not403Component } from "./not403/not403.component";

export const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [certGuard]},
    { path: 'patient', component: PatientComponent, children: [
        {path: 'new', component: PatientEditComponent},
        {path: 'edit/:id', component: PatientEditComponent}
    ], canActivate: [certGuard]},
    { path: 'medic', component: MedicComponent, canActivate: [certGuard]},
    { path: 'exam', component: ExamComponent, canActivate: [certGuard]},
    { path: 'specialty', component: SpecialtyComponent, canActivate: [certGuard]},
    { path: 'consult-wizard', component: ConsultWizardComponent, canActivate: [certGuard]},
    { path: 'search', component: SearchComponent, canActivate: [certGuard]},
    { path: 'report', component: ReportComponent, canActivate: [certGuard]},
    { path: 'not-403', component: Not403Component}
]