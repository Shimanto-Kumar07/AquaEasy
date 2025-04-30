import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  visibleNotification: boolean = true;

  isFullscreen = false; // To track fullscreen state
  toggleFullscreen() {
    const element = document.getElementById('main-container');
    if (!this.isFullscreen) {
      // Enter fullscreen
      if (element?.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any)?.webkitRequestFullscreen) { // Safari
        (element as any).webkitRequestFullscreen();
      } else if ((element as any)?.msRequestFullscreen) { // IE/Edge
        (element as any).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) { // Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { // IE/Edge
        (document as any).msExitFullscreen();
      }
    }

    this.isFullscreen = !this.isFullscreen; // Toggle fullscreen state
  }



  SideBarPopupStates: { [key: string]: 'cross' | 'menu' } = {};
  toggleSideBarPopup(event: Event, Key: string): void {

    this.SideBarPopupStates[Key] = this.SideBarPopupStates[Key] === 'cross' ? 'menu' : 'cross';

  }



  constructor(
  ) {
  }

  ngOnInit() {

    

  }

  /**
   * ON DESTROY
   */

  ngOnDestroy() {

  }
}
