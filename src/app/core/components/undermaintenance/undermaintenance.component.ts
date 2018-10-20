import { Component } from '@angular/core';
import { Maintenance } from '@app/core/models/maintenance';
import { AppService } from '@app/core/services/app.service';

@Component({
  selector: 'app-core-undermaintenance',
  templateUrl: './undermaintenance.component.html',
  styleUrls: ['./undermaintenance.component.css']
})
export class UndermaintenanceComponent {

  maintenance: Maintenance;

  constructor(
    protected appService: AppService
  ) {
    this.appService.maintenance.subscribe(data => {
      this.maintenance = data;
    });
  }
}
