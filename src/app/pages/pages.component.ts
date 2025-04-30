import { Component } from '@angular/core';
// import {ChildrenOutletContexts} from '@angular/router';
// import {slideInAnimation} from '../animations';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
  // animations: [
  //   slideInAnimation
  // ]
})
export class PagesComponent {

  constructor(
    // private contexts: ChildrenOutletContexts
  ) {
  }

  // getRouteAnimationData() {
  //   return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  // }
}
