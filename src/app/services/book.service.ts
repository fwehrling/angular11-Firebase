import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { Observable, Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: any[] = [];
  imageUrl: Subject<string> = new Subject<string>();

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  addBook(book: Book): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection('books')
        .add(book)
        .then(
          () => resolve(201),
          (err) => reject(err)
        );
    });
  }

  updateBook(id: string, book: Book): Promise<any> {
    return this.afs.collection('books').doc(id).update(book);
  }

  getBooks(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afs.collection('books').snapshotChanges();
  }

  getBook(id: string): Observable<unknown> {
    return this.afs
      .collection('books')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as Book),
          }))
        )
      );
  }

  deleteBook(id: string): Promise<void> {
    return this.afs.collection('books').doc(id).delete();
  }

  uploadFile(file: File): Observable<any> {
    const name = file.name;
    const fileRef = this.storage.ref(name);

    return this.storage
      .upload(name, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imageUrl.next(url);
          });
        })
      );
  }
}
