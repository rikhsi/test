import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { FilterItem } from '@api/models';
import { NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { VacancyBaseForm } from '../../models';

@Component({
  selector: 'test-vc-requirements',
  imports: [
    NzRadioGroupComponent,
    NzRadioComponent,
    NzFormLabelComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './vc-requirements.component.html',
  styleUrl: './vc-requirements.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VcRequirementsComponent {
  experienceList = input<FilterItem[]>();
  workTypeList = input<FilterItem[]>();
  workTimeList = input<FilterItem[]>();

  get form() {
    return <FormGroup<VacancyBaseForm>>this.fgDirective.form;
  }

  constructor(private fgDirective: FormGroupDirective) {}
}
