import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add',
    component: BookFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update/:id',
    component: BookFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'detail/:id',
    component: BookDetailComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
