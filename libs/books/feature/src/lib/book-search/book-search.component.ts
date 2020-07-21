import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  searchTerm: string;
  @ViewChild('bookSearchInput', { static: true }) bookSearchInput: ElementRef;
  constructor(
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });

    this.listenToSearchInput();
  }

  listenToSearchInput() {
    fromEvent(this.bookSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      filter(term => term.length > 2 || term.length === 0),
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      this.searchBooks(searchTerm);
    })
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.bookSearchInput.nativeElement.value = 'javascript';
    this.searchBooks('javascript');
  }

  searchBooks(searchTerm) {
      if (searchTerm) {
        this.searchTerm = searchTerm;
      this.store.dispatch(searchBooks({ term: searchTerm }));
    } else {
      this.searchTerm = '';
      this.store.dispatch(clearSearch());
    }
  }
}
