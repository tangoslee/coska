import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { DocMeta } from '@app/core/models/doc-meta';
import { HomeService } from '@app/home/services';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.css']
})
export class XmlComponent implements OnInit, OnChanges, OnDestroy {

  @Input() docMeta: DocMeta = null;

  data: string;
  docSub: any;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.docMeta) {
      this.docSub = this.homeService.getXML(this.docMeta.docId)
        .subscribe(data => {
          this.data = data;
        }, err => {
          // FIXME: Redirect to 404 Not Found
          console.error({err});
          this.data = '';
        });
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
