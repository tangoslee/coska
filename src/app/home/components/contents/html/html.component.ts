import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { HomeService } from '@app/home/services';
import { DocMeta } from '@app/core/models/doc-meta';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class HtmlComponent implements OnInit, OnChanges, OnDestroy {


  @Input() docMeta: DocMeta = null;

  data: string;

  docSub: any;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.docMeta) {
      this.docSub = this.homeService.getHTML(this.docMeta.docId).subscribe(data => this.data = data);
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
