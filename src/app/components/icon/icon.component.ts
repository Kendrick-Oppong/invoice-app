import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IconData } from '@interfaces/index';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
  
export class IconComponent {
  @Input({ required: true }) iconData!: IconData;
  
}
