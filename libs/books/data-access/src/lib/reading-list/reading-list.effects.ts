import { showSnackbar } from './../snackbar/snackbar.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import * as ReadingListActions from './reading-list.actions';
import * as SnackbarActions from '../snackbar/snackbar.actions';
import { HttpClient } from '@angular/common/http';
import { ReadingListItem } from '@tmo/shared/models';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.loadReadingList),
      fetch({
        run: () => {
          return this.http
            .get<ReadingListItem[]>('/api/reading-list')
            .pipe(
              map(data =>
                ReadingListActions.loadReadingListSuccess({ list: data })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ReadingListActions.loadReadingListError({ error });
        }
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      optimisticUpdate({
        run: ({ book }) => {
          return this.http.post('/api/reading-list', book).pipe(
            switchMap(() => [
              SnackbarActions.showSnackbar(
                {
                  message: `Added ${book.title} to your Reading list`,
                  undoAction: () => ReadingListActions.removeFromReadingList({item: {bookId: book.id, ...book} })
                }),
              ReadingListActions.addToReadingListSuccess({
                book
              })
            ]
            )
          );
        },
        undoAction: ({ book }) => {
          return ReadingListActions.addToReadingListError({
            book
          });
        }
      })
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
            switchMap(() => [
              SnackbarActions.showSnackbar(
                {
                  message: `Removed ${item.title} from your Reading list`,
                  undoAction: () => ReadingListActions.addToReadingList({ book: {id: item.bookId, ...item } })
                }
              ),
              ReadingListActions.removeFromReadingListSuccess({
                item
              })
            ]
            )
          );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.removeFromReadingListError({
            item
          });
        }
      })
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.loadReadingList();
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
