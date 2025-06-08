import {
  AfterViewInit,
  DestroyRef,
  Directive,
  Host,
  Self,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { DistrictService } from '@api/controllers';
import { SelectDefaultComponent } from '@shared/components';
import { filterToSelect } from '@shared/utils';
import { LocationBaseForm } from '@typings';
import { debounceTime, switchMap, tap } from 'rxjs';

@Directive({
  selector: '[testDistrictByRegion]',
})
export class DistrictByRegionDirective implements AfterViewInit {
  get form() {
    return <FormGroup<LocationBaseForm>>this.fgDirective.form;
  }

  constructor(
    @Host() private fgDirective: FormGroupDirective,
    @Self() private selectDefault: SelectDefaultComponent,
    private districtService: DistrictService,
    private destroyRef: DestroyRef
  ) {}

  ngAfterViewInit(): void {
    this.listenToRegion();
  }

  private listenToRegion(): void {
    this.form.controls.region.valueChanges
      .pipe(
        tap(() => {
          this.selectDefault.options.set([]);
          this.form.controls.district.reset();
        }),
        debounceTime(300),
        switchMap((regionId) => this.districtService.getByRegion$(regionId)),
        tap((options) => {
          this.selectDefault.options.set(filterToSelect(options));
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
