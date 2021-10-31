import { IUser, User as UserModel } from '../../models/user';

class User {
  static async create(user: {
    username: string,
    password: string,
  }): Promise<IUser> {
    try {
      const res = await UserModel.create(user);
      return res.get({ plain: true });
    }
    catch (error) {
      return error;
    }
  }

  static async getById(id: number): Promise<IUser | null> {
    try {
      return await UserModel.findOne({ where: { id: id }, raw: true });
    }
    catch (error) {
      return error;
    }
  }

  static async getByUsername(username: string): Promise<IUser | null> {
    try {
      return await UserModel.findOne({ where: { username: username }, raw: true });
    }
    catch (error) {
      return error;
    }
  }

  static async getAll(): Promise<IUser[] | null> {
    try {
      return await UserModel.findAll();
    }
    catch (error) {
      return error;
    }
  }

  static async update(id: number, user: IUser): Promise<IUser | null> {
    try {
      const data = await UserModel.findOne({ where: { id: id }});
      if (data) {
        const [record] = await UserModel.upsert(user);
        return record;
      }
      return null;
    }
    catch (error) {
      return error;
    }
  }
  static async delete(id: number): Promise<number | null> {
    try {
      const data = await UserModel.findOne({where: { id: id }});
      if (data) {
        return await UserModel.destroy({ where: { id: id }});
      }
      return null;
    }
    catch (error) {
      return error;
    }
  }
}

export default User;
