import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAppState } from '@app/store/app.states';
import { Observable } from 'rxjs/Observable';
import { Menu } from '@app/core/models/menu';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit, OnDestroy {

  show = false; // dropdown menu
  showNavi = false; // mobile navibar

  baseHref = environment.BASE_HREF;

  menus: Menu[];
  pgidMap: any;

  getState: Observable<any>;
  getStateSub: any;
  routeSub: any;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    this.getState = this.store.select(selectAppState);
    this.getStateSub = this.getState.subscribe(({ menus, pgidMap }) => {
      this.menus = menus;
      this.pgidMap = pgidMap;

      this.routeSub = this.route.params.subscribe(params => {
        const { ppgid, pgid } = params;

        // redirect to the 1st submenu;
        if (ppgid && !pgid) {
          const { subMenu } = this.pgidMap[ppgid];
          const [sub, ] = (subMenu)
            ? subMenu.filter(menu => Object.prototype.hasOwnProperty.call(menu, 'pgid'))
            : [ , , ];
          this.router.navigateByUrl(`${this.location.path()}/${sub.pgid}`);
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

  toggleShow() {
    this.show = !this.show;
  }

  dropdownClose(e) {
    this.show = false;
  }

  toggleNavi() {
    this.showNavi = !this.showNavi;
  }
}
