import { Component, OnInit, Input } from '@angular/core';
import { Section } from '@app/core/models';
import { AppState, selectAppState } from '@app/store/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  section: Section;
  error: any;
  link: string;

  getState: Observable<any>;
  getStateSub: any;

  routeSub: any;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState = this.store.select(selectAppState);

    this.getStateSub = this.getState.subscribe(state => {
      const { section, error } = state;
      // console.log({ section });
      this.section = section;
      this.error = error;
    });

  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(route => {
      const { ppgid, pgid } = route;
      this.link = `/${environment.BASE_HREF}/${ppgid}/${pgid}`;
    });
  }

}
