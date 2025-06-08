import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BoxContentComponent,
  InputDefaultComponent,
  TextareaComponent,
} from '@shared/components';
import { VacancyFormService } from './services';
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

@Component({
  selector: 'test-vacancy',
  imports: [
    BoxContentComponent,
    VcLanguageComponent,
    VcLocationComponent,
    VcPaymentComponent,
    VcPositionComponent,
    VcRequirementsComponent,
    VcSkillsComponent,
    InputDefaultComponent,
    TextareaComponent,
    ReactiveFormsModule,
    PaymentDurationDirective,
    FilterToItemPipe,
  ],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyComponent {
  get routeData() {
    return <VcHandbook>this.route.snapshot.data;
  }

  get vacancyForm() {
    return this.vfService.vacancyForm;
  }

  constructor(
    private vfService: VacancyFormService,
    private route: ActivatedRoute
  ) {}
}
