import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';


const routes: Routes = [
  { path: '', redirectTo: '/datatablecomponent', pathMatch: 'full' },
  { path: 'datatablecomponent', component: DataTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
