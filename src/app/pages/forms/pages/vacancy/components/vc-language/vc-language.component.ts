import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ChipComponent, SelectDefaultComponent } from '@shared/components';
import { SelectItem } from '@typings';
import { LevelByLangDirective } from '../../directives';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { VacancyBaseForm } from '../../models';
import { LANGUAGE_FORM } from '../../data';
import { LanguageSelectedPipe } from '../../pipes';

@Component({
  selector: 'test-vc-language',
  imports: [
    SelectDefaultComponent,
    ChipComponent,
    LevelByLangDirective,
    ReactiveFormsModule,
    LanguageSelectedPipe,
  ],
  templateUrl: './vc-language.component.html',
  styleUrl: './vc-language.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VcLanguageComponent {
  languages = input<SelectItem[]>([]);
  selectedOptions = input<SelectItem[]>([]);

  removed = output<number>();
  added = output<[SelectItem, SelectItem]>();

  readonly languageForm = LANGUAGE_FORM;

  get baseForm() {
    return <FormGroup<VacancyBaseForm>>this.fgDirective.form;
  }

  get languageListForm() {
    return this.baseForm.controls.languages;
  }

  constructor(private fgDirective: FormGroupDirective) {}

  onPush([type, level]: [SelectItem, SelectItem]): void {
    this.added.emit([type, level]);
  }

  onRemove(optionId: number, index: number): void {
    this.languageListForm.removeAt(index);

    this.removed.emit(optionId);
  }
}
