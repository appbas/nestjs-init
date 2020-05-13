import { Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';
import { BaseModel } from './base-model.model';

@Table({
  modelName: 'dothour',
  initialAutoIncrement: '1'
})
export class DotHour extends BaseModel<DotHour> {

  @PrimaryKey
  @Column(DataType.INTEGER)
  iduser: number;

  @Column(DataType.DATEONLY)
  date: Date | string;

  @Column(DataType.TIME)
  hour: Date | string;

}