import {
  AfterViewInit,
  Component,
  DestroyRef,
  forwardRef,
  input,
  model,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { FunctionType, SelectItem } from '@app/typings';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';
import { SelectListService } from './select-list.service';
import { NzSizeDSType } from 'ng-zorro-antd/core/types';
import { NgClass } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: 'iz-select-list',
    imports: [
        CdkVirtualScrollViewport,
        FormsModule,
        NzDropDownModule,
        ScrollingModule,
        ReactiveFormsModule,
        NgClass,
        NzInputModule,
    ],
    templateUrl: './select-list.component.html',
    styleUrl: './select-list.component.less',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectListComponent),
            multi: true,
        },
    ]
})
export class SelectListComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  options = input<SelectItem[]>();
  value = model<number>();
  searchValue = signal<string>(null);

  disabled = model<boolean>(false, { alias: 'blocked' });

  placeholder = input<string>();
  searched = output<string>();
  loadMore = output<string>();
  isDropdown = signal<boolean>(false);

  pageIndex = model<number>(0);
  pageSize = model<number>(1000);

  size = input<NzSizeDSType>('default');
  isBorderLight = input<boolean>();

  private scrollIndex = 0;

  get searchControl(): FormControl<string> {
    return this.slService.searchControl;
  }

  constructor(
    private destroyRef: DestroyRef,
    private slService: SelectListService
  ) {}

  onChange: FunctionType<number> = () => {};
  onTouched: FunctionType<number> = () => {};

  ngOnInit(): void {
    this.initSearch();
  }

  ngAfterViewInit(): void {
    this.viewport.scrolledIndexChange
      .pipe(skip(2), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const viewport = this.viewport;
        const totalContentSize = viewport.measureRenderedContentSize();
        const scrollOffset = viewport.measureScrollOffset('top');
        const viewportSize = viewport.getViewportSize();

        if (scrollOffset + viewportSize >= totalContentSize) {
          // this.loadMore.emit(this.searchValue());
          // this.pageIndex.update((i) => i + 1);
        }
      });
  }

  writeValue(value: number): void {
    this.value.set(value);

    if (value === null) {
      this.searchControl.setValue(null);
    }
  }

  registerOnChange(fn: FunctionType<number>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: FunctionType<number>): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean): void {
    this.disabled.set(state);
  }

  onModelChange(option: SelectItem): void {
    this.value.set(option.value);
    this.slService.selectedItemValue.set(option);
    this.onChange(option.value);
    this.searchControl.setValue(option.label, { emitEvent: false });
  }

  onScroll(index: number): void {
    this.scrollIndex = index;
  }

  open(): void {
    this.isDropdown.set(true);

    setTimeout(() => {
      if (this.viewport) {
        this.viewport.scrollToIndex(this.scrollIndex, 'smooth');
      }
    }, 200);
  }

  private initSearch(): void {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          this.pageIndex.set(0);
          this.searchValue.set(value);
          this.searched.emit(value);
        },
      });
  }
}
