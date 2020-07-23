import { createAction, props, Action } from '@ngrx/store';

export const showSnackbar = createAction(
  '[Books Snackbar] Show Snackbar',
  props<{ message: string, undoAction: (data?: any) => Action }>()
);

export const hideSnackbar = createAction(
  '[Book Snackbar] Hide Snackbar',
  props()
);
