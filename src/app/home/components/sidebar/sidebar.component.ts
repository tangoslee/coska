import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { environment } from '@env/environment';
import { Menu } from '@app/core/models/menu';
import { AppState, selectAppState } from '@app/store/app.states';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  pgidMap: any;
  menus: Menu[];
  ppgid: string;

  getState: Observable<any>;

  getStateSub: any;
  routeSub: any;


  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState = this.store.select(selectAppState);
    this.getStateSub = this.getState.subscribe(({ pgidMap }) => {
      this.pgidMap = pgidMap;

      this.routeSub = this.route.params.subscribe(params => {
        const { ppgid } = params;

        this.ppgid = ppgid;
        this.menus = (pgidMap[ppgid]) ? pgidMap[ppgid].subMenu : null;
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
