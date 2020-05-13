import { DotHour } from '../core/models/dothour.entity';

export const dothoursProviders = [
  {
    provide: 'DOTHOURS_REPOSITORY',
    useValue: DotHour,
  },
];