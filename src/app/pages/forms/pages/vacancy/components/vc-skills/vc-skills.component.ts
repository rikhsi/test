import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ChipComponent } from '@shared/components';
import { SelectListComponent } from '@shared/components/select-list';
import { SelectItem } from '@typings';
import { VacancyBaseForm } from '../../models';

@Component({
  selector: 'test-vc-skills',
  imports: [SelectListComponent, ChipComponent, ReactiveFormsModule],
  templateUrl: './vc-skills.component.html',
  styleUrl: './vc-skills.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [],
})
export class VcSkillsComponent {
  selectedOptions = input<SelectItem[]>([]);
  isLoading = input<boolean>();

  options = input<SelectItem[]>([]);

  removed = output<number>();
  added = output<number>();
  searched = output<string>();
  loadMore = output<string>();

  get baseForm() {
    return <FormGroup<VacancyBaseForm>>this.controlContainer.control;
  }

  get skillsControl() {
    return this.baseForm.controls.skills;
  }

  constructor(private controlContainer: ControlContainer) {}

  onReset(id: number): void {
    const filtered = this.skillsControl.value.filter((item) => item !== id);

    this.removed.emit(id);
    this.skillsControl.setValue(filtered);
  }
}
