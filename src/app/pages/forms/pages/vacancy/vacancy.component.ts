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
  VacancySkillsService,
} from './services';
import { ActivatedRoute } from '@angular/router';
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
  providers: [VacancyJobService, VacancySkillsService],
})
export class VacancyComponent implements OnInit {
  jobList = computed(() => this.vjService.options());
  skillsList = computed(() => this.vsService.options());

  jobSelectedList = computed(() => this.vjService.selectedOptions());
  skillSelectedList = computed(() => this.vsService.selectedOptions());

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
    private destroyRef: DestroyRef,
    private flService: FormLayoutService
  ) {}

  ngOnInit(): void {
    this.listenBaseFormChange();
    this.initJobs();
    this.initSkills();
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
}
