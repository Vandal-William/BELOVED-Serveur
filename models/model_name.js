import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/client.js';

class Model_name extends Model { };

Model_name.init({
    champ_name: DataTypes.TEXT,

}, {
    sequelize,
    tableName: "model_name"
});

export default Model_name;