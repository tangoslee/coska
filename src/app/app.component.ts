import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, selectAppState } from './store/app.states';
import { GetStatus } from './store/actions/app.action';
import { Maintenance } from './core/models/maintenance';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  maintenance: Maintenance;
  getState: Observable<any>;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAppState);
    this.store.dispatch(new GetStatus());

    this.getState.subscribe(({ maintenance }) => {
      console.log({maintenance});
      this.maintenance = maintenance;
    });
  }

}
