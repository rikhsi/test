import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import {
  BoxContentComponent,
  InputDefaultComponent,
  TextareaComponent,
} from '@shared/components';
import {
  VacancyFormService,
  VacancyJobService,
  VacancyLanguageService,
  VacancySkillsService,
} from './services';
import { ActivatedRoute, Router } from '@angular/router';
import {
  VcLanguageComponent,
  VcLocationComponent,
  VcPaymentComponent,
  VcPositionComponent,
  VcRequirementsComponent,
  VcSkillsComponent,
} from './components';
import { VcHandbook } from './models';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentDurationDirective } from './directives';
import { FilterToItemPipe } from '@shared/pipes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormLayoutService } from '@layouts/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RouteBase } from '@constants';
import { createVacancyForm } from './data';
import { SelectItem } from '@typings';

@Component({
  selector: 'test-vacancy',
  imports: [
    BoxContentComponent,
    VcLanguageComponent,
    VcLocationComponent,
    VcPaymentComponent,
    VcRequirementsComponent,
    VcSkillsComponent,
    InputDefaultComponent,
    TextareaComponent,
    ReactiveFormsModule,
    PaymentDurationDirective,
    FilterToItemPipe,
    VcPositionComponent,
  ],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    VacancyJobService,
    VacancySkillsService,
    VacancyFormService,
    VacancyLanguageService,
  ],
})
export class VacancyComponent implements OnInit {
  jobList = computed(() => this.vjService.options());
  skillsList = computed(() => this.vsService.options());

  jobSelectedList = computed(() => this.vjService.selectedOptions());
  skillSelectedList = computed(() => this.vsService.selectedOptions());
  langSelectedList = computed(() => this.vLangService.selectedOptions());

  isJobLoading = computed(() => this.vjService.isLoading());
  isSkillsLoading = computed(() => this.vsService.isLoading());

  get routeData() {
    return <VcHandbook>this.route.snapshot.data;
  }

  get vacancyForm() {
    return this.vfService.vacancyForm;
  }

  get jobSearch$() {
    return this.vjService.search$;
  }

  get skillsSearch$() {
    return this.vsService.search$;
  }

  constructor(
    private vfService: VacancyFormService,
    private route: ActivatedRoute,
    private vjService: VacancyJobService,
    private vsService: VacancySkillsService,
    private vLangService: VacancyLanguageService,
    private destroyRef: DestroyRef,
    private flService: FormLayoutService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listenBaseFormChange();
    this.initJobs();
    this.initSkills();
    this.initSubmit();
    this.initReset();
  }

  onSelectJob(id: number): void {
    this.vjService.onSelect(id);
  }

  onRemoveJob(id: number): void {
    this.vjService.onRemove(id);
  }

  onSelectSkill(id: number): void {
    this.vsService.onSelect(id);
  }

  onRemoveSkill(id: number): void {
    this.vsService.onRemove(id);
  }

  onSelectLang(items: [SelectItem, SelectItem]): void {
    this.vLangService.onPush(items);
  }

  onRemoveLang(id: number): void {
    this.vLangService.onRemove(id);
  }

  private initSubmit(): void {
    this.flService.submit$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.notification.success('Успешно!', 'Вакансия создана!');

        this.router.navigate([RouteBase.MAIN]);
      });
  }

  private initReset(): void {
    this.flService.reset$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.vacancyForm.patchValue({
          ...createVacancyForm().value,
        });

        this.vjService.selectedOptions.set([]);
        this.vsService.selectedOptions.set([]);
        this.vLangService.selectedOptions.set([]);

        this.notification.success('Форма обнулена!', 'Заполните заново');
      });
  }

  private initJobs(): void {
    this.vjService
      .initSearch$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.jobSearch$.next(null);
  }

  private initSkills(): void {
    this.vsService
      .initSearch$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.skillsSearch$.next(null);
  }

  private listenBaseFormChange(): void {
    this.vacancyForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.flService.disableSubmit.set(this.vacancyForm.invalid);
      });
  }
}
