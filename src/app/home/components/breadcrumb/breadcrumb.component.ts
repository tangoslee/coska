import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState, selectAppState } from '@app/store/app.states';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { environment } from '@env/environment';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  baseHref = environment.BASE_HREF;
  paths: string[] = [];
  pgidMap: any;
  getState: Observable<any>;

  getStateSub: any;
  routeSub: any;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState = this.store.select(selectAppState);
    this.getStateSub = this.getState.subscribe(({ pgidMap }) => this.pgidMap = pgidMap);
    this.routeSub = this.route.params.subscribe(params => this.paths = Object.values(params));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.getStateSub) {
      this.getStateSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
