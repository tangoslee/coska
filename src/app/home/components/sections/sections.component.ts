import { Component, OnInit } from '@angular/core';
import { Section, Content } from '@app/core/models';
import { AppState, selectAppState } from '@app/store/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { GetSection } from '@app/store/actions/app.action';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
})
export class SectionsComponent implements OnInit {
  section: Section;
  format: string;
  error: any;
  link: string;

  getState: Observable<any>;
  getStateSub: any;

  routeSub: any;

  uriMap: any;
  content: Content;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.getState = this.store.select(selectAppState);

    this.getStateSub = this.getState.subscribe(state => {
      const { section, error, uriMap, content } = state;
      // console.log({ section, uriMap });
      this.section = section;
      this.error = error;
      this.uriMap = uriMap;
      this.content = content;
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(route => {
      const { ppgid, pgid } = route;
      this.link = `/${environment.BASE_HREF}/${ppgid}/${pgid}`;
      this.format = this.uriMap[`${ppgid}/${pgid}`].format;

      const id = ppgid && pgid ? `${ppgid}/${pgid}` : '';
      const content = this.content;
      const { layout, doctype } = this.uriMap[id];
      // const layout = 'section';
      const path = `${layout}/${id}`;
      // console.log('getsection path = ' + path)
      this.store.dispatch(new GetSection({ ...content, path, id, layout, doctype }));

    });
  }
}
