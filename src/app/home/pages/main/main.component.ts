import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '@app/home/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  html: string;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
  ) {
    this.route.params.subscribe(params => {
      const { ppgid, pgid } = params;
      console.log({ppgid, pgid});
      const page = (ppgid && pgid) ? `${ppgid}/${pgid}` : 'main';
      this.homeService.getPages(page).subscribe(data => this.html = data);
    });
  }

  ngOnInit() {
  }


}
