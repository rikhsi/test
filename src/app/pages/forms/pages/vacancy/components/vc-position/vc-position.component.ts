import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  FormGroup,
  ControlContainer,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectListComponent } from '@shared/components/select-list';
import { SelectItem } from '@typings';
import { VacancyBaseForm } from '../../models';
import { ChipComponent } from '@shared/components';

@Component({
  selector: 'test-vc-position',
  imports: [SelectListComponent, ChipComponent, ReactiveFormsModule],
  templateUrl: './vc-position.component.html',
  styleUrl: './vc-position.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VcPositionComponent {
  options = input<SelectItem[]>([]);
  selectedOptions = input<SelectItem[]>([]);
  isLoading = input<boolean>();

  removed = output<number>();
  added = output<number>();
  searched = output<string>();
  loadMore = output<string>();

  get baseForm() {
    return <FormGroup<VacancyBaseForm>>this.controlContainer.control;
  }

  get jobControl() {
    return this.baseForm.controls.job;
  }

  constructor(private controlContainer: ControlContainer) {}

  onReset(): void {
    this.removed.emit(this.jobControl.value.at(0));

    this.jobControl.reset([]);
  }
}
