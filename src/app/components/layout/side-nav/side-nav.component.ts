import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [NgOptimizedImage, IconComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  readonly iconData = ICONS;
}
