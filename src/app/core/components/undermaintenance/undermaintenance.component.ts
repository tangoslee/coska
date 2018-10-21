import { Component } from '@angular/core';
import { Maintenance } from '@app/core/models/maintenance';
import { AppService } from '@app/core/services';
import { Store } from '@ngrx/store';
import { AppState, selectAppState } from '@app/store/app.states';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-core-undermaintenance',
  templateUrl: './undermaintenance.component.html',
  styleUrls: ['./undermaintenance.component.css']
})
export class UndermaintenanceComponent {

  maintenance: Maintenance;

  getState: Observable<any>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(selectAppState);

    this.getState.subscribe(({ maintenance }) => {
      this.maintenance = maintenance;
    });
  }
}
