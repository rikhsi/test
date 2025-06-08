import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VacancyBaseForm } from '../models';
import { VACANCY_FORM } from '../data';

@Injectable()
export class VacancyFormService {
  readonly vacancyForm: FormGroup<VacancyBaseForm> = VACANCY_FORM;
}
