import {Component, Input} from '@angular/core';
import {NavBreadcrumb} from '../../../interfaces/core/nav-breadcrumb.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() title: string = 'General';
  @Input() navArray: NavBreadcrumb[] = [];
}
