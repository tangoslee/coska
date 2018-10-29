import { Component, OnInit, Input } from '@angular/core';
import { Content } from '@app/core/models/content';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.css']
})
export class XmlComponent implements OnInit {

  @Input() content: Content = null;


  constructor(
  ) { }

  ngOnInit() {
  }

}
