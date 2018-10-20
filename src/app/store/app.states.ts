import * as app from './reducers/app.reducer';
import { createFeatureSelector } from '@ngrx/store';
import { AppEffects } from './effects/app.effect';


export interface AppState {
  appState: app.State;
}

export const reducers = {
  app: app.reducer,
};

export const effects = [
  AppEffects,
];

export const selectAppState = createFeatureSelector<AppState>('app');



