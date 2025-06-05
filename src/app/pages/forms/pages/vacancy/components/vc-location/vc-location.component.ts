import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FilterItem } from '@api/models';
import {
  InputDefaultComponent,
  SelectDefaultComponent,
} from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { MMapComponent } from '@shared/modals';

@Component({
  selector: 'test-vc-location',
  imports: [
    SelectDefaultComponent,
    NzOptionComponent,
    InputDefaultComponent,
    NzButtonComponent,
    NzIconDirective,
  ],
  templateUrl: './vc-location.component.html',
  styleUrl: './vc-location.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzDrawerService],
})
export class VcLocationComponent {
  regions = input<FilterItem[]>([]);
  discricts = input<FilterItem[]>([]);

  constructor(private ndService: NzDrawerService) {}

  openMap(): void {
    this.ndService.create<MMapComponent, number[], number[]>({
      nzTitle: null,
      nzFooter: null,
      nzClosable: false,
      nzPlacement: 'bottom',
      nzContent: MMapComponent,
      nzData: [],
      nzWidth: '100vw',
      nzHeight: '80svh',
      nzWrapClassName: 'bottom-drawer',
    });
  }
}
