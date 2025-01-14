import { Component } from '@angular/core';
import { ICONS } from '@constants/index';
import { IconComponent } from '@components/icon/icon.component';
import { ThemeToggleComponent } from "../../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [IconComponent, ThemeToggleComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  readonly iconData = ICONS;
}
