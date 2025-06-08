import { FilterItem } from '@api/models';
import { VcRequirement } from './requirement';

export interface VcHandbook {
  requirements: VcRequirement;
  regions: FilterItem[];
  languages: FilterItem[];
}
