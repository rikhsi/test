import {
  DestroyRef,
  Directive,
  Host,
  input,
  output,
  Self,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { LevelService } from '@api/controllers';
import { SelectDefaultComponent } from '@shared/components';
import { filterToSelect } from '@shared/utils';
import { tap, debounceTime, switchMap, filter } from 'rxjs';
import { VacancyBaseForm, VacancyLanguageForm } from '../models';
import { SelectItem } from '@typings';

@Directive({
  selector: '[testLevelByLang]',
})
export class LevelByLangDirective {
  parentList = input<FormGroup<VacancyBaseForm>>(null, {
    alias: 'testLevelByLang',
  });

  languages = input<SelectItem[]>([]);

  currentLevels = signal<SelectItem[]>([]);

  push = output<[SelectItem, SelectItem]>();

  get form() {
    return <FormGroup<VacancyLanguageForm>>this.fgDirective.form;
  }

  constructor(
    @Host() private fgDirective: FormGroupDirective,
    @Self() private selectDefault: SelectDefaultComponent,
    private levelService: LevelService,
    private destroyRef: DestroyRef
  ) {}

  ngAfterViewInit(): void {
    this.listToForm();
    this.listenToType();
  }

  private listenToType(): void {
    this.form.controls.type.valueChanges
      .pipe(
        tap(() => {
          this.currentLevels.set([]);
          this.selectDefault.options.set([]);
          this.form.controls.level.reset();
        }),
        debounceTime(300),
        switchMap((languageId) => this.levelService.getByLanguage$(languageId)),
        tap((options) => {
          this.currentLevels.set(filterToSelect(options));
          this.selectDefault.options.set(this.currentLevels());
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private listToForm(): void {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        debounceTime(100),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ level, type }) => {
        const findedType = this.languages().find((l) => l.value === type);
        const findedLevel = this.currentLevels().find((d) => d.value === level);

        this.parentList().controls.languages.push(
          new FormGroup({
            level: new FormControl(level),
            type: new FormControl(type),
          })
        );

        this.push.emit([findedType, findedLevel]);

        this.form.reset(null, { emitEvent: false });

        this.selectDefault.options.set([]);
      });
  }
}
