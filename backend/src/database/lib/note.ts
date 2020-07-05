import { Note as NoteModel, INote } from '../../models/note';

class Note {
  static async create(note: {
    title: string,
    description: string,
    color: string,
  }, ownerId: number): Promise<INote> {
    try {
      if (!ownerId) throw 'ownerId is required';
      return await NoteModel.create({
        ...note,
        ownerId,
      });
    }
    catch (error) {
      return error;
    }
  }

  static async getById(id: number): Promise<INote | null> {
    try {
      return await NoteModel.findOne({ where: { id: id }, raw: true });
    }
    catch (error) {
      return error;
    }
  }

  static async getByOwnerId(ownerId: number): Promise<INote[] | null> {
    try {
      return await NoteModel.findAll({ where: { ownerId: ownerId }});
    }
    catch (error) {
      return error;
    }
  }

  static async update(id: number, note: INote): Promise<INote | null> {
    try {
      const data = await NoteModel.findOne({ where: { id: id }});
      if (data) {
        const [record] = await NoteModel.upsert(note);
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
      const data = await NoteModel.findOne({where: { id: id }});
      if (data) {
        return await NoteModel.destroy({ where: { id: id }});
      }
      return null;
    }
    catch (error) {
      return error;
    }
  }
}

export default Note;
