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
import { distinctUntilChanged, debounceTime, filter, map, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  searchTerm: string;
  searchForm = this.fb.group({
    term: ''
  });
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });

    this.listenToSearchInput();
  }

  listenToSearchInput() {
    this.searchForm.valueChanges.pipe(
      map(val => val.term),
      filter((term) => term.length > 2 || term.length === 0),
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
    this.searchForm.controls.term.setValue('javascript');
  }

  searchBooks(searchTerm?) {
      if (searchTerm) {
        this.searchTerm = searchTerm;
      this.store.dispatch(searchBooks({ term: searchTerm }));
    } else {
      this.searchTerm = '';
      this.store.dispatch(clearSearch());
    }
  }
}
