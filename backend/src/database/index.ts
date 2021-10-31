import NoteModel from '../models/note';
import UserModel from '../models/user';
import sequelize from './lib/connection';
import Note from './lib/note';
import User from './lib/user';

NoteModel.belongsTo(UserModel, { targetKey: 'id' });
UserModel.hasMany(NoteModel, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'notes', // this determines the name in `associations`!
});

sequelize.sync()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database synced!');
  }).catch((err) => {
    console.error(err);
  });

export default {
  sequelize,
  User,
  Note,
};
