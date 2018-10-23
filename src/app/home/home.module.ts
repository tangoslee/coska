import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { HomeRoutingModule } from './home-routing.module';

import {
  NavibarComponent,
  FooterComponent,
  BreadcrumbComponent,
  SidebarComponent,
} from '@app/home/components';

import { HomeService } from '@app/home/services';
import { MainComponent } from '@app/home/pages';
import {
  ContentsComponent,
  HtmlComponent,
  MarkdownComponent,
  XmlComponent,
} from './components/contents';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    MarkdownModule.forRoot({
      // loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
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
    XmlComponent,
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
    XmlComponent,
  ],
  providers: [
    HomeService,
  ]
})
export class HomeModule { }
