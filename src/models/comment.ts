import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
} from 'sequelize'
import { sequelize } from '../database/database'

export class Comment extends Model<
    InferAttributes<Comment>,
    InferCreationAttributes<Comment>
> {
    declare id: string
    declare parentId: string | null
    declare channelId: string
    declare videoId: string
    declare author: string
    declare likeCount: number
    declare text: string
    declare sentiment: number | null
    declare timeSubmitted: Date
    declare timeArchived: Date
    declare authorChannelId: string
    declare authorChannelUrl: string
    declare getReplies: HasManyGetAssociationsMixin<Comment>
    declare addReply: HasManyAddAssociationMixin<Comment, string>
    declare hasReply: HasManyHasAssociationMixin<Comment, string>

    declare static associations: {
        replies: Association<Comment, Comment>
    }
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
                model: 'Comments',
                key: 'id',
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sentiment: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        timeSubmitted: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        timeArchived: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        authorChannelId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorChannelUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: 'Comment',
        tableName: 'Comments',
        timestamps: false,
        sequelize: sequelize,
    },
)

Comment.hasMany(Comment, {
    as: 'replies',
    foreignKey: 'parentId',
})

Comment.belongsTo(Comment, {
    as: 'parent',
    foreignKey: 'parentId',
})
