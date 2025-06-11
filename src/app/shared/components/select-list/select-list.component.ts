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
import { LoadingComponent } from '../loading/loading.component';

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
    LoadingComponent,
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
  isLoading = input<boolean>();

  isDropdown = signal<boolean>(false);

  searched = output<string>();
  loadMore = output<string>();

  get searchControl() {
    return this.slService.searchControl;
  }

  private previousScrollOffset = 0;

  constructor(
    private slService: SelectListService,
    private destroyRef: DestroyRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.listenToScrolled();
    this.initSearch();
  }

  private scrollIndex = 0;
  private viewportSize = 400;

  onScroll(index: number): void {
    this.scrollIndex = index;
  }

  open(): void {
    this.isDropdown.set(true);

    timer(200).subscribe(() => {
      this.viewport().scrollToIndex(this.scrollIndex, 'smooth');
    });
  }

  blur(): void {
    this.isDropdown.set(false);
  }

  onModelChange({ value, label }: SelectItem): void {
    const currentValue = this.value();

    if (this.mode() === 'default') {
      this.value.set([value]);
      this.searchControl.setValue(label, { emitEvent: false });
    } else {
      const isAlreadyHas = currentValue.includes(value);

      if (isAlreadyHas) {
        this.value.update((current) =>
          current.filter((item) => item !== value)
        );
      } else {
        this.value.update((current) => {
          current.push(value);
          return current;
        });
      }
    }
  }

  override setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);

    if (isDisabled) {
      this.searchControl.disable({ emitEvent: false });
    } else {
      this.searchControl.enable({ emitEvent: false });
    }
  }

  private listenToScrolled(): void {
    this.viewport()
      .scrolledIndexChange.pipe(skip(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const totalContentSize =
          this.viewport().measureRenderedContentSize() - 10;
        const scrollOffset = this.viewport().measureScrollOffset('top');

        const isScrollingDown = scrollOffset > this.previousScrollOffset;

        this.previousScrollOffset = scrollOffset;

        if (
          isScrollingDown &&
          !this.isLoading() &&
          scrollOffset + this.viewportSize >= totalContentSize
        ) {
          this.loadMore.emit(this.searchControl.value);
        }
      });
  }

  private initSearch(): void {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.searched.emit(value);
      });
  }
}
