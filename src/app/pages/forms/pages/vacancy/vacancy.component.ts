import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BoxContentComponent,
  InputDefaultComponent,
  TextareaComponent,
} from '@shared/components';
import { VacancyService } from './services/vacancy.service';
import { VacancyResourseService } from './services/vacancy-resourse.service';
import { ActivatedRoute } from '@angular/router';
import {
  VcLanguageComponent,
  VcLocationComponent,
  VcPaymentComponent,
  VcPositionComponent,
  VcRequirementsComponent,
  VcSkillsComponent,
} from './components';
import { VcHandbook, VcRequirement } from './models';

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
  ],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyComponent {
  get routeData() {
    return <VcHandbook>this.route.snapshot.data;
  }

  requirements: VcRequirement = this.routeData.requirements;

  constructor(
    private vrService: VacancyResourseService,
    private vService: VacancyService,
    private route: ActivatedRoute
  ) {}
}
