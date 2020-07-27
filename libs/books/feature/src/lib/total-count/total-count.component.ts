import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTotalUnread } from '@tmo/books/data-access';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.scss']
})
export class TotalCountComponent implements OnInit, OnDestroy {
  totalUnread$: Observable<ReadingListItem[]>;
  keepSubscription = true;
  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.select(getTotalUnread).pipe(takeWhile(() => this.keepSubscription));
  }
  
  ngOnDestroy() {
    this.keepSubscription = false;
  }
}
