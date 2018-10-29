import { Component, OnInit, Input } from '@angular/core';
import { Content } from '@app/core/models/content';
import { Store } from '@ngrx/store';
import { AppState, selectAppState } from '@app/store/app.states';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contents',
  styles: [''],
  template: `
  <app-file-not-found *ngIf="error"></app-file-not-found>
  <ng-container *ngIf="!error" [ngSwitch]="content.type">
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

  constructor(
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(selectAppState);

    this.getStateSub = this.getState.subscribe(state => {
      const { error, content } = state;
      // console.log({ error, content });
      this.content = content;
      this.error = error;
    });
  }

  ngOnInit() {
  }
}
