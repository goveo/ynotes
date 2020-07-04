import { Model, INTEGER, STRING } from 'sequelize';
import sequelize from '../database/lib/connection';

export interface INote {
  id: number,
  title: string,
  description: string | null,
  color: string,
}

export class Note extends Model implements INote {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public color!: string;
}

Note.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: true,
  },
  color: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: sequelize,
  modelName: 'note',
});

export default Note;
