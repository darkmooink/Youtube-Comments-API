import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
} from "sequelize";
import { sequelize } from "../database/database";

export class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: string;
  declare parentId: string | null;
  declare channelId: string;
  declare videoId: string;
  declare author: string;
  declare likeCount: number;
  declare text: string;
  // Methods to work with the replies association
  declare getReplies: HasManyGetAssociationsMixin<Comment>;
  declare addReply: HasManyAddAssociationMixin<Comment, string>;
  declare hasReply: HasManyHasAssociationMixin<Comment, string>;

  // Association between comments (one-to-many)
  declare static associations: {
    replies: Association<Comment, Comment>;
  };
}

Comment.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "Comments",
        key: "id",
      },
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Comment",
    tableName: "Comments",
    timestamps: false,
    sequelize: sequelize,
  }
);

Comment.hasMany(Comment, {
  as: "replies",
  foreignKey: "parentId",
});
