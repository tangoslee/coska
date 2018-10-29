import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState, selectAppState } from '@app/store/app.states';
import { Content, Section } from '@app/core/models';
import { GetContent, GetSection } from '@app/store/actions/app.action';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  uriMap: any;
  content: Content;

  getState: Observable<any>;
  getStateSub: any;
  routeSub: any;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState = this.store.select(selectAppState);

    this.getStateSub = this.getState.subscribe(({ uriMap, content }) => {
      // console.log({uriMap, content});
      this.content = content;
      this.uriMap = uriMap;
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(route => {
      const { ppgid, pgid, postid } = route;
      const content = this.content;
      const id = (ppgid && pgid) ? `${ppgid}/${pgid}` : '';

      // console.log({ id, hit: this.uriMap[id] });
      if (postid) {
        console.log('getpost:', postid);
        this.store.dispatch(new GetContent({ ...content, id: `/section/${ppgid}/${pgid}/${postid}`, type: 'markdown' }));
      } else if (this.uriMap && this.uriMap[id] !== undefined) {
        const { type } = this.uriMap[id];
        if (type === 'section') {
          this.store.dispatch(new GetSection({ ...content, id, type }));
        } else {
          this.store.dispatch(new GetContent({ ...content, id, type }));
        }
      } else {
        this.store.dispatch(new GetContent({ type: 'html', id: 'main', body: '' }));
      }
    });
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
