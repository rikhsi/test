import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LanguageService } from '@api/controllers';
import { FilterItem } from '@api/models';

export const languageResolver: ResolveFn<FilterItem[]> = () => {
  const langService = inject(LanguageService);

  return langService.getAll$();
};
