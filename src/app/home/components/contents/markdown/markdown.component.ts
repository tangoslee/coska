import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocMeta } from '@app/core/models/doc-meta';
import { HomeService } from '@app/home/services';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit, OnChanges {

  @Input() docMeta: DocMeta = null;

  data: string;


  constructor(
    private homeService: HomeService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.docMeta) {
      this.homeService.getMarkDown(this.docMeta.docId).subscribe(data => this.data = data);
    }
  }

  ngOnInit() {
  }

}
