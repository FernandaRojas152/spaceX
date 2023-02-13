import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchDetailComponent } from './launch-detail/launch-detail.component';
import { HeaderComponent } from './header/header.component';
import { LaunchesComponent } from './launches/launches.component';

const routes: Routes = [
  {path: 'launches/:id', component: LaunchDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
