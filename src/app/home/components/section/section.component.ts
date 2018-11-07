import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  AfterViewInit,
  Directive,
  ViewChildren,
  QueryList,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import { Section } from '@app/core/models';
import { AppState, selectAppState } from '@app/store/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { AnonymousSubject } from 'rxjs/Subject';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit, AfterViewInit {
  section: Section;
  error: any;
  link: string;
  // coverImageMap: any = {};

  getState: Observable<any>;
  getStateSub: any;

  routeSub: any;

  time: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.getState = this.store.select(selectAppState);

    this.getStateSub = this.getState.subscribe(state => {
      const { section, error } = state;
      // console.log({ section });
      this.section = section;
      this.error = error;

      // init coverImageMap
      // const { posts } = section;
      // this.coverImageMap = posts.reduce((hash, post) => {
      //   const { id, coverImage } = post;
      //   hash[id] = coverImage;
      //   return hash;
      // }, {});
    });
  }

  // init() {
  //   // let windowTop = 0;
  //   // let windowBottom = window.innerHeight;

  //   const elements = document.querySelectorAll('.card-img-top');
  //   Array.from(elements).map(element => {
  //     const id = element.getAttribute('data-id');
  //     const img = this.coverImageMap[id];
  //     if (element.getAttribute('src') !== img) {
  //       element.setAttribute('src', img);
  //     }
  //     // let elementTop = Math.ceil(element.getBoundingClientRect().top + document.body.scrollTop);
  //     // let elementBottom = elementTop + Math.ceil(element.getBoundingClientRect().height);

  //     // // console.log({ windowTop, windowBottom, elementTop, elementBottom });
  //     // if (elementBottom < windowTop || elementTop > windowBottom) {
  //     //   // if (element.getAttribute('src') !== 'assets/img/E9E9E9-0.8.png') {
  //     //   //   element.setAttribute('src', 'assets/img/E9E9E9-0.8.png');
  //     //   // }
  //     // } else {
  //     //   const id = element.getAttribute('data-id');
  //     //   const img = this.coverImageMap[id];
  //     //   if (element.getAttribute('src') !== img) {
  //     //     element.setAttribute('src', img);
  //     //   }
  //     // }
  //   });
  // }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(route => {
      const { ppgid, pgid } = route;
      this.link = `/${environment.BASE_HREF}/${ppgid}/${pgid}`;
    });
  }

  ngAfterViewInit() {
    // this.init();
  }
}
