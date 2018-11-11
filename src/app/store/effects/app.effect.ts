import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import {
  AppActionTypes,
  GetStatusSuccess,
  GetDocHTML,
  GetContent,
  GetDocMarkdown,
  GetContentFailure,
  GetDocXML,
  GetContentSuccess,
  GetSection,
  GetSectionSuccess,
  GetSectionFailure
} from '../actions/app.action';
import { HomeService } from '@app/home/services';
import { AppService } from '@app/core/services';

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

  @Effect()
  GetContent: Observable<Action> = this.actions.pipe(
    ofType(AppActionTypes.GET_CONTENT),
    map(({ payload }: GetContent) => {
      const { doctype } = payload;


      switch (doctype) {
        case 'html': {
          return new GetDocHTML(payload);
        }

        case 'markdown': {
          return new GetDocMarkdown(payload);
        }

        case 'xml': {
          return new GetDocXML(payload);
        }
      }


      return new GetContentFailure(`Unsupported content doctype: ${doctype}`);
    })
  );

  @Effect()
  GetDocHTML: Observable<Action> = this.actions
    .pipe(
      ofType(AppActionTypes.GET_DOC_HTML),
      switchMap((action: GetDocHTML) => {
        const { id, layout, path } = action.payload;
        return this.homeService.getHTML(path)
          .pipe(
            map(data => new GetContentSuccess({...data, layout})),
            catchError(error => Observable.of(new GetContentFailure(error)))
          );
      })
    );

  @Effect()
  GetDocMarkdown: Observable<Action> = this.actions
    .pipe(
      ofType(AppActionTypes.GET_DOC_MARKDOWN),
      switchMap((action: GetDocMarkdown) => {
        const { id, layout, path } = action.payload;
        return this.homeService.getMarkDown(path)
          .pipe(
            map(data => new GetContentSuccess({...data, layout})),
            catchError(error => Observable.of(new GetContentFailure(error)))
          );
      })
    );

  @Effect()
  GetDocXML: Observable<Action> = this.actions
    .pipe(
      ofType(AppActionTypes.GET_DOC_XML),
      switchMap((action: GetDocXML) => {
        const { id, layout, path } = action.payload;
        return this.homeService.getXML(path)
          .pipe(
            map(data => new GetContentSuccess({...data, layout})),
            catchError(error => {
              return Observable.of(new GetContentFailure(error));
            })
          );
      })
    );

  @Effect()
  GetSection: Observable<Action> = this.actions
    .pipe(
      ofType(AppActionTypes.GET_SECTION),
      switchMap((action: GetSection) => {
        // console.log({ GetSection: action.payload });
        const { id, layout } = action.payload;
        return this.homeService.getSection(`${layout}/${id}`)
          .pipe(
            map(section => {
              return new GetSectionSuccess(section);
            }),
            catchError(error => Observable.of(new GetSectionFailure(error)))
          );
      })
    );
}
