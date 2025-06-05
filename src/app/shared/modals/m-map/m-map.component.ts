import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputMapComponent } from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'test-m-map',
  imports: [
    InputMapComponent,
    NzButtonComponent,
    NzIconDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './m-map.component.html',
  styleUrl: './m-map.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MMapComponent {
  readonly coordsControl = new FormControl<number[]>([]);

  constructor(private drawerRef: NzDrawerRef<number[], number[]>) {}

  cancel(): void {
    this.drawerRef.close();
  }

  reset(): void {
    this.coordsControl.reset([]);
  }

  submit(): void {
    this.drawerRef.close(this.coordsControl.value);
  }
}
