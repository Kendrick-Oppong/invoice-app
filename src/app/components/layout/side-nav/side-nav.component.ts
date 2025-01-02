import { Component } from '@angular/core';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [ IconComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  readonly iconData = ICONS;
}
