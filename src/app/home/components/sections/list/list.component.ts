import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@app/core/models';

@Component({
  selector: 'app-sections-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input()
  posts: Post[];

  @Input()
  link: string;

  constructor() {}

  ngOnInit() {}
}
