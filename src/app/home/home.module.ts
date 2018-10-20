import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { HomeRoutingModule } from './home-routing.module';

import {
  NavibarComponent,
  FooterComponent,
  BreadcrumbComponent,
} from '@app/home/components';

import {
  MainComponent,
} from '@app/home/pages';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeService } from './services';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    // MarkdownModule.forRoot({
    //   // loader: HttpClient,
    //   markedOptions: {
    //     provide: MarkedOptions,
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
  ],
  exports: [
    BreadcrumbComponent,
    FooterComponent,
    MainComponent,
    NavibarComponent,
    SidebarComponent,
  ],
  providers: [
    HomeService,
  ]
})
export class HomeModule { }
