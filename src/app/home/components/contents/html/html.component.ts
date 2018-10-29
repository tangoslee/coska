import { Component, OnInit, Input } from '@angular/core';
import { Content } from '@app/core/models/content';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class HtmlComponent implements OnInit {


  @Input() content: Content = null;

  constructor(
  ) { }

  ngOnInit() {
  }

}
