import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@app/core/models';

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

  constructor() {}

  ngOnInit() {}
}
