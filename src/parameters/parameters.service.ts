import { Inject, Injectable } from '@nestjs/common';
import { Parameter } from 'src/core/models/parameter.entity';


@Injectable()
export class ParametersService {

  constructor(@Inject('PARAMETERS_REPOSITORY') private parametersRepository: typeof Parameter){}

  async getByCod(codParameter: number): Promise<Parameter> {
    console.log(codParameter)
    return await this.parametersRepository.findByPk(codParameter);
  }

}
