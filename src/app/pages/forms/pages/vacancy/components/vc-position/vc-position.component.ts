import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  viewChild,
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
  selectListRef = viewChild(SelectListComponent);

  selectedItems = input<SelectItem[]>([]);
  isLoading = input<boolean>();

  options = input<SelectItem[]>([]);
  selectedOptions = computed(() => this.selectListRef()?.selectedOptions());

  searched = output<string>();
  loadMore = output<string>();

  get baseForm() {
    return <FormGroup<VacancyBaseForm>>this.controlContainer.control;
  }

  get jobControl() {
    return this.baseForm.controls.job;
  }

  constructor(private controlContainer: ControlContainer) {}
}
