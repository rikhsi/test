import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { SelectCardComponent } from '@shared/components';
import { AVAILABLE_FORMS } from './data';
import { CardItem, FormView } from '@typings';
import { NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MainService } from './main.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RouteBase } from '@constants';

@Component({
  selector: 'test-main',
  imports: [
    SelectCardComponent,
    NzRadioGroupComponent,
    NzButtonComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
  providers: [MainService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  readonly formList: CardItem<FormView>[] = AVAILABLE_FORMS;

  get formViewControl() {
    return this.mainService.formViewControl;
  }

  constructor(private mainService: MainService, private router: Router) {}

  @HostListener('keydown.enter', ['$event'])
  submit(): void {
    this.router.navigate([RouteBase.FORMS, this.formViewControl.value]);
  }
}
