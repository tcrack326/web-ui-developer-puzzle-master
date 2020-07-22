import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const loadReadingList = createAction('[Reading List] Load list');

export const loadReadingListSuccess = createAction(
  '[Reading List] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Reading List] Add to list',
  props<{ book: Book }>()
);

export const addToReadingListError = createAction(
  '[Reading List] Failed add to list',
  props<{ book: Book }>()
);

export const addToReadingListSuccess = createAction(
  '[Reading List] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Reading List] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListError = createAction(
  '[Reading List] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListSuccess = createAction(
  '[Reading List] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const markBookAsFinished = createAction(
  '[Reading List] Mark Book Finished',
  props<{ item: ReadingListItem }>()
);

export const markBookAsFinishedError = createAction(
  '[Reading List] Failed book finished',
  props<{ item: ReadingListItem }>()
);

export const markBookAsFinishedSuccess = createAction(
  '[Reading List] Confirmed book finished',
  props<{ item: ReadingListItem }>()
);
