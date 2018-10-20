import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Maintenance } from '@app/core/models/maintenance';

@Injectable()
export class AppService {

  private maintenanceSub = new BehaviorSubject(null);
  public maintenance = this.maintenanceSub.asObservable();

  private loadingSub = new BehaviorSubject(false);
  public onLoading = this.loadingSub.asObservable();

  private alertSub = new ReplaySubject<any>(1);
  public alert = this.alertSub.asObservable();

  private menuSub = new BehaviorSubject(null);
  public menu = this.menuSub.asObservable();


  constructor() { }

  setMaintenance(maintenance: Maintenance) {
    this.maintenanceSub.next(maintenance);
  }

  loading() {
    this.loadingSub.next(true);
  }

  unloading() {
    this.loadingSub.next(false);
  }

  setAlert(message: string, options: any = {}) {
    const opt = { ...options, message };
    this.alertSub.next(opt);
  }


}
