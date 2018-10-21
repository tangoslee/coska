import { Component, OnInit, Input } from '@angular/core';
import { DocMeta } from '@app/core/models/doc-meta';

@Component({
  selector: 'app-contents',
  styles: [''],
  template: `
  <ng-container [ngSwitch]="docMeta.type">
    <app-html *ngSwitchCase="'html'" [docMeta]="docMeta"></app-html>
  </ng-container>
  `
})
export class ContentsComponent implements OnInit {

  @Input() docMeta: DocMeta;

  constructor() { }

  ngOnInit() {
  }
}
