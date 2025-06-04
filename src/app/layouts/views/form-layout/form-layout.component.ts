import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'test-form-layout',
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLayoutComponent {}
