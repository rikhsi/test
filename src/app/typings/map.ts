export interface ZoomRange {
  min: number;
  max: number;
}

export type ZoomRounding = 'snap' | 'smooth' | 'auto';

export type YMapTheme = 'light' | 'dark';

export type MapCenter = [number, number];

export type MapMode = 'raster' | 'vector' | 'auto';

export type MapControl =
  | 'zoomControl'
  | 'typeSelector'
  | 'routePanelControl'
  | 'routeEditor'
  | 'mapTools'
  | 'rulerControl'
  | 'clusterer'
  | 'trafficControl'
  | 'searchControl'
  | 'geolocationControl'
  | 'fullscreenControl';

export type MapBehavior = 'drag' | 'scrollZoom';
