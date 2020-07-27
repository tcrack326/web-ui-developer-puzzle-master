import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Observable } from 'rxjs';
import { ReadingListItem } from '@tmo/shared/models';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit, OnDestroy {
  readingList$: Observable<ReadingListItem[]>;
  keepSubscription = true;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.readingList$ = this.store.select(getReadingList).pipe(takeWhile(() => this.keepSubscription));
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  ngOnDestroy() {
    this.keepSubscription = false;
  }
}
