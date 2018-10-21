import { Component, OnInit, Input } from '@angular/core';

import { AppService } from '@app/core/services';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input()
  show = false;

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.appService.onLoading.subscribe(loading => this.show = loading);
  }

}
