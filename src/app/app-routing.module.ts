import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog/:id/details', component: BlogDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
