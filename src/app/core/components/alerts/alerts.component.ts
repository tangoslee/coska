import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/core/services';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  type = 'alert';
  show = false;
  alert: any;

  timeoutId: any;

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit() {

    // this.alert = {
    //   message: 'This is a test message',
    //   type: 'warning',
    // };

    this.appService.alert.subscribe(alert => {
      this.alert = alert;
      this.show = true;
      // console.log('alert:', this.alert);
      this.timeoutId = setTimeout(this.show = false, 1500);
    });
  }

}
