import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/auth-state';
import { AppState } from '../app.state';

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
    'auth'
);

export const selectAuthUser = createSelector(
    selectAuthState,
    (state: AuthState) => state?.user
  );