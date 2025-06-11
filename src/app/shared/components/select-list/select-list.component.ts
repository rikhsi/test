import {
  AfterViewInit,
  Component,
  DestroyRef,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { SelectItem } from '@app/typings';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { skip, timer } from 'rxjs';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ControlBaseDirective } from '@shared/directives';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { SelectListService } from './select-list.service';
import { NgClass } from '@angular/common';
import { NzSelectModeType } from 'ng-zorro-antd/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 't-select-list',
  imports: [
    CdkVirtualScrollViewport,
    FormsModule,
    NzDropDownModule,
    ScrollingModule,
    ReactiveFormsModule,
    NzInputDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NgClass,
  ],
  templateUrl: './select-list.component.html',
  styleUrl: './select-list.component.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectListComponent),
      multi: true,
    },
  ],
})
export class SelectListComponent
  extends ControlBaseDirective<number[]>
  implements AfterViewInit
{
  viewport = viewChild(CdkVirtualScrollViewport);

  options = input<SelectItem[]>();
  placeholder = input<string>('');
  noColon = input<boolean>();
  label = input<string>();
  size = input<NzSizeLDSType>('large');
  mode = input<NzSelectModeType>('default');

  isDropdown = signal<boolean>(false);

  searched = output<string>();
  loadMore = output<void>();

  get searchControl() {
    return this.slService.searchControl;
  }

  constructor(
    private slService: SelectListService,
    private destroyRef: DestroyRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.listenToScrolled();
  }

  private scrollIndex = 0;

  onScroll(index: number): void {
    this.scrollIndex = index;
  }

  open(): void {
    this.isDropdown.set(true);

    timer(50).subscribe(() => {
      this.viewport().scrollToIndex(this.scrollIndex, 'smooth');
    });
  }

  blur(): void {
    this.isDropdown.set(false);
  }

  override setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);

    if (isDisabled) {
      this.searchControl.disable({ emitEvent: false });
    } else {
      this.searchControl.enable({ emitEvent: false });
    }
  }

  override modelChange([optionId]: number[]): void {
    const currentValue = this.value();

    if (this.mode() === 'default') {
      this.value.set([optionId]);
    } else {
      const isAlreadyHas = currentValue.includes(optionId);

      if (isAlreadyHas) {
        this.value.update((current) =>
          current.filter((item) => item !== optionId)
        );
      } else {
        this.value.update((current) => {
          current.push(optionId);
          return current;
        });
      }
    }
  }

  private listenToScrolled(): void {
    this.viewport()
      .scrolledIndexChange.pipe(skip(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const totalContentSize = this.viewport().measureRenderedContentSize();
        const scrollOffset = this.viewport().measureScrollOffset('top');
        const viewportSize = this.viewport().getViewportSize();

        if (scrollOffset + viewportSize >= totalContentSize) {
          console.log(1);
          this.loadMore.emit();
        }
      });
  }
}
