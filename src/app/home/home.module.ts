import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { HomeRoutingModule } from './home-routing.module';

import {
  NavibarComponent,
  FooterComponent,
  BreadcrumbComponent,
  SidebarComponent,
} from '@app/home/components';

import { HomeService } from '@app/home/services';
import { MainComponent } from '@app/home/pages';
import { ContentsComponent, HtmlComponent, MarkdownComponent } from './components/contents';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    // MarkdownModule.forRoot({
    //   // loader: HttpClient,
    //   markedOptions: {
    //     provide: MarkedOptions2,
    //     useValue: {
    //       gfm: true,
    //       tables: true,
    //       breaks: false,
    //       pedantic: false,
    //       sanitize: false,
    //       smartLists: true,
    //       smartypants: false,
    //     },
    //   },
    // }),
  ],
  declarations: [
    MainComponent,
    NavibarComponent,
    BreadcrumbComponent,
    FooterComponent,
    SidebarComponent,
    ContentsComponent,
    HtmlComponent,
    MarkdownComponent,
  ],
  exports: [
    BreadcrumbComponent,
    FooterComponent,
    MainComponent,
    NavibarComponent,
    SidebarComponent,
    ContentsComponent,
    HtmlComponent,
    MarkdownComponent,
  ],
  providers: [
    HomeService,
  ]
})
export class HomeModule { }
