import connection from "../config/connection"
import { DataTypes, Model } from "sequelize"

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client: {
      type: DataTypes.STRING
    },
    table_number: {
      type: DataTypes.INTEGER
    },
    dishes: {
      type: DataTypes.JSON
    }
  },
  {
    sequelize: connection,
    paranoid: true,
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
)

export default Order
