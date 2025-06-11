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
import { VacancyFormService, VacancyJobService } from './services';
import { ActivatedRoute } from '@angular/router';
import {
  VcLanguageComponent,
  VcLocationComponent,
  VcPaymentComponent,
  VcRequirementsComponent,
  VcSkillsComponent,
} from './components';
import { VcHandbook } from './models';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentDurationDirective } from './directives';
import { FilterToItemPipe } from '@shared/pipes';
import {
  SelectListComponent,
  SelectListService,
} from '@shared/components/select-list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    SelectListComponent,
  ],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SelectListService, VacancyJobService],
})
export class VacancyComponent implements OnInit {
  jobList = computed(() => this.vjService.options());
  isJobLoading = computed(() => this.vjService.isLoading());

  get routeData() {
    return <VcHandbook>this.route.snapshot.data;
  }

  get vacancyForm() {
    return this.vfService.vacancyForm;
  }

  get search$() {
    return this.vjService.search$;
  }

  constructor(
    private vfService: VacancyFormService,
    private route: ActivatedRoute,
    private vjService: VacancyJobService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.initJobs();
  }

  private initJobs(): void {
    this.vjService
      .initSearch$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.search$.next(null);
  }
}
