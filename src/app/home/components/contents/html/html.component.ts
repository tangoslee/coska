import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HomeService } from '@app/home/services';
import { DocMeta } from '@app/core/models/doc-meta';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class HtmlComponent implements OnInit, OnChanges {


  @Input() docMeta: DocMeta = null;

  data: string;


  constructor(
    private homeService: HomeService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.docMeta) {
      this.homeService.getHTML(this.docMeta.docId).subscribe(data => this.data = data);
    }
  }

  ngOnInit() {
  }

}
