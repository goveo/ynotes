import { Sequelize } from 'sequelize';
import { POSTGRES_URL } from '../../app.config';
const sequelize = new Sequelize(POSTGRES_URL);

export default sequelize;
