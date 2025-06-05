import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FilterItem } from '@api/models';
import { ChipComponent, SelectDefaultComponent } from '@shared/components';
import { NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'test-vc-language',
  imports: [SelectDefaultComponent, ChipComponent, NzOptionComponent],
  templateUrl: './vc-language.component.html',
  styleUrl: './vc-language.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VcLanguageComponent {
  languages = input<FilterItem[]>([]);
  levels = input<FilterItem[]>([]);
}
