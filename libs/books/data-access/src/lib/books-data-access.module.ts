import { SnackbarEffects } from './snackbar/snackbar.effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBooks from './books/books.reducer';
import { BooksEffects } from './books/books.effects';
import * as fromReadingList from './reading-list/reading-list.reducer';
import { ReadingListEffects } from './reading-list/reading-list.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBooks.BOOKS_FEATURE_KEY, fromBooks.reducer),
    StoreModule.forFeature(
      fromReadingList.READING_LIST_FEATURE_KEY,
      fromReadingList.reducer
    ),
    EffectsModule.forFeature([BooksEffects, ReadingListEffects, SnackbarEffects])
  ]
})
export class BooksDataAccessModule {}
