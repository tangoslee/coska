import { Component, OnInit, Input } from '@angular/core';
import { Content } from '@app/core/models/content';
import { Store } from '@ngrx/store';
import { AppState, selectAppState } from '@app/store/app.states';
import { Observable } from 'rxjs/Observable';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { ActivatedRoute } from '@angular/router';
import { GetContent } from '@app/store/actions/app.action';

@Component({
  selector: 'app-contents',
  styles: [''],
  template: `
  <app-file-not-found *ngIf="error"></app-file-not-found>
  <ng-container *ngIf="!error" [ngSwitch]="content.doctype">
    <app-html *ngSwitchCase="'html'" [content]="content"></app-html>
    <app-markdown *ngSwitchCase="'markdown'" [content]="content"></app-markdown>
    <app-xml *ngSwitchCase="'xml'" [content]="content"></app-xml>
  </ng-container>
  `
})
export class ContentsComponent implements OnInit {

  @Input() content: Content;
  error: any;

  getState: Observable<any>;
  getStateSub: any;
  routeSub: any;

  uriMap: AngularWaitBarrier;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState = this.store.select(selectAppState);

    this.getStateSub = this.getState.subscribe(state => {
      const { error, content, uriMap } = state;
      // console.log({ error, content });
      this.content = content;
      this.error = error;
      this.uriMap = uriMap;
    });

  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(route => {
      const { ppgid, pgid, postid } = route;
      const content = this.content;

      const id = ppgid && pgid ? `${ppgid}/${pgid}` : '';
      const { layout, doctype } = this.uriMap[id];

      // Section posts should have a postid
      if (layout === 'section' && !postid) {
        // invalid access
        return;
      }

      const path = postid
        ? `section/${id}/${postid}`
        : `${layout}/${id}`;

      // console.log('getpost:', postid, { layout, doctype, path });

      this.store.dispatch(
        new GetContent({
          ...content,
          path,
          doctype,
          id: postid ? `${id}/${postid}` : id,
          layout: 'page',
        })
      );

    });
  }
}
