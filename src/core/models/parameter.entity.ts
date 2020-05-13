import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';
import { BaseModel } from './base-model.model';

@Table({
  modelName: 'parameter'
})
export class Parameter extends BaseModel<Parameter> {

  @PrimaryKey
  @Column(DataType.INTEGER)
  codparameter: number;

  @Column(DataType.STRING)
  value: any;

  @Column(DataType.STRING)
  description: string;  

}