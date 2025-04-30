import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import localeBn from '@angular/common/locales/bn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  constructor(
    private meta: Meta,
  ) {
    this.googleNoIndex();
    registerLocaleData(localeBn, 'bn');

  }


  /**
   * SEO TITLE
   * SEO META TAGS
   */

  private googleNoIndex() {
    this.meta.updateTag({name: 'robots', content: 'noindex'});
    this.meta.updateTag({name: 'googlebot', content: 'noindex'});
  }
}
