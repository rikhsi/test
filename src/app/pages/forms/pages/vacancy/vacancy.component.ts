import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoxContentComponent, ItemLabelComponent } from '@shared/components';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { VacancyService } from './services/vacancy.service';
import { VacancyResourseService } from './services/vacancy-resourse.service';
import { ActivatedRoute } from '@angular/router';
import { FilterItem } from '@api/models';

@Component({
  selector: 'test-vacancy',
  imports: [
    BoxContentComponent,
    ItemLabelComponent,
    NzRadioGroupComponent,
    NzRadioComponent,
  ],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyComponent {
  requirements: Array<FilterItem[]> = this.route.snapshot.data['requirements'];

  constructor(
    private vrService: VacancyResourseService,
    private vService: VacancyService,
    private route: ActivatedRoute
  ) {}
}
