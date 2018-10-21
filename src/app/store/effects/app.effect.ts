import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

// import 'rxjs/operator/map';
// import 'rxjs/add/operator/switchMap';

import { AppActionTypes, GetStatusSuccess, GetStatus } from '../actions/app.action';
import { HomeService } from '@app/home/services';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class AppEffects {

  constructor(
    private actions: Actions,
    private homeService: HomeService,
  ) { }

  @Effect()
  GetStatus: Observable<Action> = this.actions.pipe(
    ofType(AppActionTypes.GET_STATUS),
    switchMap(action => this.homeService.init()),
    map(data => new GetStatusSuccess(data))
  );
}
