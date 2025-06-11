import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  InputDefaultComponent,
  SelectDefaultComponent,
} from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { MMapComponent } from '@shared/modals';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { LocationBaseForm, MMapResult, SelectItem } from '@typings';
import { DistrictByRegionDirective } from '../../directives';

@Component({
  selector: 'test-vc-location',
  imports: [
    SelectDefaultComponent,
    InputDefaultComponent,
    NzButtonComponent,
    NzIconDirective,
    ReactiveFormsModule,
    DistrictByRegionDirective,
  ],
  templateUrl: './vc-location.component.html',
  styleUrl: './vc-location.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzDrawerService],
})
export class VcLocationComponent {
  regions = input<SelectItem[]>([]);
  discricts = input<SelectItem[]>([]);

  get locationForm() {
    return <FormGroup<LocationBaseForm>>(
      this.fgDirective.form.controls['location']
    );
  }

  constructor(
    private ndService: NzDrawerService,
    private fgDirective: FormGroupDirective
  ) {}

  openMap(): void {
    this.ndService
      .create<MMapComponent, number[], MMapResult>({
        nzTitle: null,
        nzFooter: null,
        nzClosable: false,
        nzPlacement: 'bottom',
        nzContent: MMapComponent,
        nzData: this.locationForm.controls.coords.value,
        nzWidth: '100vw',
        nzHeight: '80svh',
        nzWrapClassName: 'bottom-drawer',
      })
      .afterClose.subscribe(({ address, coords }) => {
        this.locationForm.patchValue({
          address,
          coords,
        });
      });
  }
}
