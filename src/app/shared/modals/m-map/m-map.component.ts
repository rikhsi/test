import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputMapComponent } from '@shared/components';
import { MMapResult } from '@typings';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
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
export class MMapComponent implements OnInit {
  inputMapComponent = viewChild(InputMapComponent);

  readonly coordsControl = new FormControl<number[]>(null);

  constructor(
    private drawerRef: NzDrawerRef<number[], MMapResult>,
    @Inject(NZ_DRAWER_DATA) private initialState: number[]
  ) {}

  ngOnInit(): void {
    this.coordsControl.setValue(this.initialState ?? []);
  }

  cancel(): void {
    this.drawerRef.close();
  }

  reset(): void {
    this.coordsControl.reset([]);

    this.cancel();
  }

  submit(): void {
    this.drawerRef.close({
      coords: this.coordsControl.value,
      address: this.inputMapComponent().address(),
    });
  }
}
