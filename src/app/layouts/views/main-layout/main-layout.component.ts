import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@layouts/components';

@Component({
  selector: 'test-main-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
