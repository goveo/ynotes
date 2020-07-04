import { Note as NoteModel, INote } from '../../models/note';

class Note {
  static async create(note: INote): Promise<INote> {
    try {
      return await NoteModel.create(note);
    }
    catch (error) {
      return error;
    }
  }

  static async get(id: number): Promise<INote | null> {
    try {
      return await NoteModel.findOne({ where: { id: id } });
    }
    catch (error) {
      return error;
    }
  }

  static async getAll(): Promise<INote[] | null> {
    try {
      return await NoteModel.findAll();
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
