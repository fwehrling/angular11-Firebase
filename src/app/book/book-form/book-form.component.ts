import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  bookForm: FormGroup = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    summary: new FormControl(),
  });
  book!: Book;
  status = 'Créer';
  loading = false;

  fileUrl!: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.bookService.imageUrl.subscribe((url) => (this.fileUrl = url))
    );

    this.subscription.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.bookService.getBook(params.id).subscribe((data: any) => {
            this.book = data.filter((books: any) => books.id === params.id)[0];
            this.status = 'Modifier';
            this.initForm();
          });
        } else {
          this.initForm();
        }
      })
    );
  }

  initForm(): void {
    const title = this.book?.title ?? '';
    const author = this.book?.author ?? '';
    const summary = this.book?.summary ?? '';

    this.fileUrl = this.book?.image ?? null;

    this.bookForm = this.formBuilder.group({
      title: [title, [Validators.required]],
      author: [author, [Validators.required]],
      summary: [summary, [Validators.required]],
    });
  }

  onSaveBook(id: string | null | undefined): void {
    this.loading = true;

    const values = { ...this.bookForm.value, image: this.fileUrl };

    if (id) {
      this.bookService.updateBook(id, values).then(() => {
        this.loading = false;
        this.router.navigate(['/books/view', id]);
      });
    } else {
      this.bookService.addBook(values).then(() => {
        this.loading = false;
        this.router.navigate(['/books']);
      });
    }
  }

  onUploadFile(file: File): void {
    this.subscription.add(
      this.bookService.uploadFile(file).subscribe((url: any) => {})
    );
  }

  detectFiles(event: any): void {
    this.onUploadFile(event?.target?.files[0]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
