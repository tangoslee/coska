import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DocMeta } from '@app/core/models/doc-meta';
import { HomeService } from '@app/home/services';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit, OnChanges, OnDestroy {

  @Input() docMeta: DocMeta = null;

  data: string;
  docSub: any;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.docMeta) {
      this.docSub = this.homeService.getMarkDown(this.docMeta.docId).subscribe(data => this.data = data);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.docSub) {
      this.docSub.unsubscribe();
    }
  }
}
