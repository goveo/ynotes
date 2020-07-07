import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../../app.config';
const sequelize = new Sequelize(DATABASE_URL);

export default sequelize;
