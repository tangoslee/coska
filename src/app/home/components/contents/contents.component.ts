import { Component, OnInit, Input } from '@angular/core';
import { DocMeta } from '@app/core/models/doc-meta';

@Component({
  selector: 'app-contents',
  styles: [''],
  template: `
  <ng-container [ngSwitch]="docMeta.type">
    <app-html *ngSwitchCase="'html'" [docMeta]="docMeta"></app-html>
    <app-markdown *ngSwitchCase="'markdown'" [docMeta]="docMeta"></app-markdown>
    <app-xml *ngSwitchCase="'xml'" [docMeta]="docMeta"></app-xml>
  </ng-container>
  `
})
export class ContentsComponent implements OnInit {

  @Input() docMeta: DocMeta;

  constructor() { }

  ngOnInit() {
  }
}
