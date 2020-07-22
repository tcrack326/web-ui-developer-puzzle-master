import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, markBookAsFinished, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  markBookAsFinished(item) {
    console.log('clicked marked book finished with: ', item);
    this.store.dispatch(markBookAsFinished({ item }));
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
