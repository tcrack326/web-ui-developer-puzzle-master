import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SnackbarActions from './snackbar.actions';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from '@ngrx/store';

const SNACKBAR_DURATION = 40000; // in milliseconds


@Injectable()
export class SnackbarEffects {
  showSnackbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SnackbarActions.showSnackbar),
      distinctUntilChanged(),
      tap((action) => {
        const snackBarRef = this.matSnackBar.open(action.message, 'Undo', { duration: SNACKBAR_DURATION });
        snackBarRef.onAction().subscribe(() => this.store.dispatch(action.undoAction()));
      })
    )
  );

  hideSnackbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SnackbarActions.hideSnackbar),
      distinctUntilChanged(),
      tap(() => this.matSnackBar.dismiss())
  )
  );

  constructor(private actions$: Actions, private matSnackBar: MatSnackBar, private store: Store) {}
}
