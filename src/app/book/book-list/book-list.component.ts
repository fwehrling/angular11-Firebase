import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  books: any[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.subscription.add(
      this.bookService.getBooks().subscribe((res) => (this.books = res))
    );
  }

  onDeleteBook(id: string, event: Event): void {
    event?.stopPropagation();
    this.bookService
      .deleteBook(id)
      .then(() => {
        this.getBooks();
      })
      .catch((erreur) => console.log(erreur));
  }

  onCreateBook(): void {
    this.router.navigate(['/books/add']);
  }

  onViewBook(id: string): void {
    this.router.navigate(['/books', 'detail', id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
