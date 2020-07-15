import { Note as NoteModel, INote } from '../../models/note';
import { literal, Op } from 'sequelize';

class Note {
  static async create(note: {
    title: string,
    description: string,
    color: string,
  }, ownerId: number): Promise<INote> {
    try {
      if (!ownerId) throw 'ownerId is required';
      const index = await NoteModel.count({ where: { ownerId: ownerId }});
      return await NoteModel.create({
        ...note,
        ownerId,
        index,
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
      return await NoteModel.findAll({
        where: { ownerId: ownerId },
        order: [['index', 'ASC']],
      });
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
      const note = await this.getById(id);
      if (note) {
        await NoteModel.destroy({ where: { id: id }});
        await NoteModel.update({ index: literal('index - 1') }, {
          where: {
            ownerId: note.ownerId,
            index: {
              [Op.gt]: note.index,
            },
          },
        });
      }
      return null;
    }
    catch (error) {
      return error;
    }
  }

  static async updateIndex(note: INote, newIndex: number): Promise<INote | null> {
    const currentIndex: number = note.index;
    try {
      if (currentIndex > newIndex) {
        await NoteModel.update({ index: literal('index + 1') }, {
          where: {
            ownerId: note.ownerId,
            index: {
              [Op.gte]: newIndex,
              [Op.lt]: currentIndex,
            },
          },
        });
      }
      else if (currentIndex < newIndex) {
        await NoteModel.update({ index: literal('index - 1') }, {
          where: {
            ownerId: note.ownerId,
            index: {
              [Op.gt]: currentIndex,
              [Op.lte]: newIndex,
            },
          },
        });
      }
      const [newNote] = await NoteModel.upsert({
        ...note,
        index: newIndex,
      });
      return newNote;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Note;
