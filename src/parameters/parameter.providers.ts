import { Parameter } from 'src/core/models/parameter.entity';

export const parametersProviders = [
  {
    provide: 'PARAMETERS_REPOSITORY',
    useValue: Parameter,
  },
];