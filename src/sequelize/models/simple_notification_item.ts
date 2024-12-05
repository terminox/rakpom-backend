import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '..'

class SimpleNotificationItem extends Model<InferAttributes<SimpleNotificationItem>, InferCreationAttributes<SimpleNotificationItem>> {
  declare id: CreationOptional<string>
  declare userID: string
  declare title: string
  declare description: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

SimpleNotificationItem.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'SimpleNotificationItem',
  tableName: 'SimpleNotificationItems',
})

export default SimpleNotificationItem 