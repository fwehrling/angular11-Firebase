import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  declarations: [BookListComponent, BookDetailComponent, BookFormComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class BookModule {}
