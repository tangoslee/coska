import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { SectionComponent } from './components/section/section.component';
import { FileNotFoundComponent } from './components/file-not-found/file-not-found.component';

@NgModule({
  imports: [CommonModule, CoreModule, HomeRoutingModule],
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
    SectionComponent,
    FileNotFoundComponent,
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
    SectionComponent,
    FileNotFoundComponent,
  ],
  providers: [HomeService],
})
export class HomeModule {}
