import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@app/core/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sections-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  posts: Post[];

  @Input()
  link: string;

  private route: any;
  private router: any;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.route = _route;
    this.router = _router;
  }

  ngOnInit() { }

  goPost(link, postId) {
    if (this.router.url.indexOf(postId) !== -1) {
      // same url
      this.route.navigate([link, postId]);
    }
  }
}
