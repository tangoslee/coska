import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState, selectAppState } from '@app/store/app.states';
import { DocMeta } from '@app/core/models/doc-meta';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  docMeta: DocMeta = { type: 'html', docId: 'main' };

  getState: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.getState = this.store.select(selectAppState);


  }

  ngOnInit() {
    this.getState.subscribe(({ pgidMap }) => {
      this.route.params.subscribe(({ ppgid, pgid }) => {
        // console.log({ppgid, pgid});
        const { type } = (pgidMap[pgid]) ? pgidMap[pgid] : { type: null };
        if (type) {
          this.docMeta = {
            type,
            docId: (ppgid && pgid) ? `${ppgid}/${pgid}` : 'main'
          };
        }
      });
    });
  }


}
