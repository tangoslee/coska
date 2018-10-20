import {
  Component, OnInit, OnChanges,
  Input, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-core-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() options: any;
  @Input() page: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];
  total: number;
  // per_page: number;
  // per_pageset: number;

  total_page: number;
  total_pageset: number;
  pageset: number;

  prev_pageset: number;
  next_pageset: number;

  constructor() { }

  ngOnChanges() {
    this.initPage();
  }

  ngOnInit() {
  }

  initPage() {
    this.total = this.options.total || 0;
    const per_page = this.options.per_page || 20;
    const per_pageset = this.options.per_pageset || 10;

    if (this.total === 0) { return; }

    this.total_page = Math.ceil(this.total / per_page);
    this.total_pageset = Math.ceil(this.total_page / per_pageset);
    this.pageset = Math.ceil(this.page / per_pageset);

    const s_offset = per_pageset * (this.pageset - 1) + 1;
    let e_offset = per_pageset + s_offset - 1;
    if (e_offset > this.total_page) {
      e_offset = this.total_page;
    }

    this.prev_pageset = s_offset - 1;
    this.next_pageset = e_offset + 1;

    if (this.pages[0] !== s_offset) {
      this.pages = [];
      for (let i = s_offset; i <= e_offset; ++i) {
        this.pages.push(i);
      }
    }
    // console.log('total_page:', this.total_page, ',total_pageset:', this.total_pageset,
    //   ',pageset:', this.pageset);
    // console.log('s_offsets:', s_offset, ', e_offset:', e_offset);
  }

  onClick(page) {
    // console.log('page click:', page);
    this.pageChange.emit(page);
    this.page = page;
  }

  onNextClick(page) {
    // console.log('next click:', page);
    this.pageChange.emit(page);
    this.page = page;
    this.initPage();
  }

}

export interface PageNavOpt {
  page: number;
  total: number;
  per_page: number;
  per_pageset: number;
}


// Example:
// <!-- S: Pagination -->
// <div class="d-flex justify-content-center">
//   <app-pagination *ngIf="pageOpt" [title]="''" [page]="page" [options]="pageOpt" (pageChange)="onChangePage($event)">
//   </app-pagination>
// </div>
// <!-- E: Pagination -->
