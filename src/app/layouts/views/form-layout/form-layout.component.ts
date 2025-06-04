import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'test-form-layout',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    NzButtonComponent,
    RouterLink,
    NzIconDirective,
  ],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLayoutComponent {}
