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
  uriMap: any;
  getState: Observable<any>;

  getStateSub: any;
  routeSub: any;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState = this.store.select(selectAppState);
    this.getStateSub = this.getState.subscribe(({ uriMap }) => {
      this.uriMap = uriMap;
      this.routeSub = this.route.params.subscribe(params => {
        const { ppgid, pgid } = params;
        this.paths = [];
        if (ppgid) {
          this.paths.push(ppgid);
        }
        if (pgid) {
          this.paths.push(`${ppgid}/${pgid}`);
        }
      });
    });
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
