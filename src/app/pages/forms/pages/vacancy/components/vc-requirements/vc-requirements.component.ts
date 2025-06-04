import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FilterItem } from '@api/models';
import { NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';

@Component({
  selector: 'test-vc-requirements',
  imports: [NzRadioGroupComponent, NzRadioComponent, NzFormLabelComponent],
  templateUrl: './vc-requirements.component.html',
  styleUrl: './vc-requirements.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VcRequirementsComponent {
  experienceList = input<FilterItem[]>();
  workTypeList = input<FilterItem[]>();
  workTimeList = input<FilterItem[]>();
}
