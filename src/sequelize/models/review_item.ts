import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '..'

class ReviewItem extends Model<InferAttributes<ReviewItem>, InferCreationAttributes<ReviewItem>> {
  declare id: string
  declare userID: string
  declare shopID: string
  declare score: number
  declare content: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

ReviewItem.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shopID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
  content: {
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
  modelName: 'ReviewItem',
  tableName: 'ReviewItems',
  timestamps: true,
})

export default ReviewItem 