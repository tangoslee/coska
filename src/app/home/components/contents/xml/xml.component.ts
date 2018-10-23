import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DocMeta } from '@app/core/models/doc-meta';
import { HomeService } from '@app/home/services';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.css']
})
export class XmlComponent implements OnInit, OnChanges {

  @Input() docMeta: DocMeta = null;

  data: string;


  constructor(
    private homeService: HomeService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.docMeta) {
      this.homeService.getXML(this.docMeta.docId).subscribe(data => this.data = data);
    }
  }

  ngOnInit() {
  }
}
