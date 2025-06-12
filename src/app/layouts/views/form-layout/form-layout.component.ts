import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MODAL_OPTIONS } from '@constants';
import { RESET_MODAL_DATA, SUBMIT_MODAL_DATA } from '@layouts/data';
import { FormLayoutService } from '@layouts/services';
import { MConfirmComponent } from '@shared/modals';
import { ConfirmModal } from '@typings';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'test-form-layout',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    NzButtonComponent,
    RouterLink,
    NzIconDirective,
    NzButtonComponent,
  ],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormLayoutService, NzModalService, NzNotificationService],
})
export class FormLayoutComponent {
  disableSubmit = computed(() => this.flService.disableSubmit());
  disableReset = computed(() => this.flService.disableReset());

  constructor(
    private flService: FormLayoutService,
    private nmService: NzModalService
  ) {}

  reset(): void {
    this.nmService
      .create<MConfirmComponent, ConfirmModal, boolean>({
        ...MODAL_OPTIONS,
        nzData: RESET_MODAL_DATA,
        nzContent: MConfirmComponent,
      })
      .afterClose.pipe(filter((state) => state))
      .subscribe(() => {
        this.flService.reset$.next();
      });
  }

  submit(): void {
    this.nmService
      .create<MConfirmComponent, ConfirmModal, boolean>({
        ...MODAL_OPTIONS,
        nzData: SUBMIT_MODAL_DATA,
        nzContent: MConfirmComponent,
      })
      .afterClose.pipe(filter((state) => state))
      .subscribe(() => {
        this.flService.submit$.next();
      });
  }
}
