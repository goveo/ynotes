import { Model, INTEGER, STRING } from 'sequelize';
import sequelize from '../database/lib/connection';

export interface IUser {
  username: string,
  password: string,
}

export class User extends Model implements IUser {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: sequelize,
  modelName: 'user',
});

export default User;
