import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlBaseDirective } from '@shared/directives';
import { MapCenter, YMapTheme } from '@typings';
import {
  AngularYandexMapsModule,
  YaEvent,
  YaReadyEvent,
} from 'angular8-yandex-maps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 't-input-map',
  imports: [AngularYandexMapsModule, NzSpinModule, NzFormModule, NgClass],
  templateUrl: './input-map.component.html',
  styleUrls: ['./input-map.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMapComponent),
      multi: true,
    },
  ],
})
export class InputMapComponent extends ControlBaseDirective<number[]> {
  coords = model<number[]>();
  theme = input<YMapTheme>();
  center = input<MapCenter>([41.2995, 69.2401]);
  zoom = input<number>(10);
  address = model<string>();
  isReady = signal<boolean>(false);
  map = signal<ymaps.Map>(null);
  label = input<string>('');

  onMapInit({ target }: YaReadyEvent<ymaps.Map>): void {
    target.controls.remove('zoomControl');
    target.controls.remove('typeSelector');
    target.controls.remove('routePanelControl');
    target.controls.remove('routeEditor');
    target.controls.remove('mapTools');
    target.controls.remove('rulerControl');
    target.controls.remove('clusterer');
    target.controls.remove('trafficControl');
    target.controls.remove('fullscreenControl');

    target.cursors.push('pointer');

    this.map.set(target);

    this.isReady.set(true);
  }

  async onMapClick({ event }: YaEvent<ymaps.Map>): Promise<void> {
    const coords = event.get('coords');

    this.coords.set(coords);
    this.onChange(coords);
  }

  async geometryChange(): Promise<void> {
    const content = await this.getAddress(this.coords());

    this.map().balloon.open(this.coords(), { content }, { closeButton: false });

    this.address.set(content);
  }

  private async getAddress(coords: number[]): Promise<string> {
    const geocoder = ymaps.geocode(coords);

    const res = await geocoder;
    const firstGeoObject = res.geoObjects.get(0);

    const address: string = firstGeoObject.properties.get('text');

    return address;
  }
}
