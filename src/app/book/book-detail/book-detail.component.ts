import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from './../../interfaces/book';
import { BookService } from './../../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  book?: Book;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.bookService.getBook(params.id).subscribe((data: any) => {
          this.book = data.filter((books: any) => books.id === params.id)[0];
        });
      })
    );
  }

  onUpdateBook(id: string | undefined): void {
    if (id) {
      this.router.navigate(['books/update/', id]);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
