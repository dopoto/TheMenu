import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.states';

export const selectAuthState = createFeatureSelector<AppState>('auth');
