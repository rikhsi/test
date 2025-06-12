import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VacancyBaseForm } from '../models';
import { createVacancyForm } from '../data';

@Injectable()
export class VacancyFormService {
  readonly vacancyForm: FormGroup<VacancyBaseForm> = createVacancyForm();
}
