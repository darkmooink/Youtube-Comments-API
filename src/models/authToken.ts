import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
} from 'sequelize'
import { sequelize } from '../database/database'

export class AuthToken extends Model<
    InferAttributes<AuthToken>,
    InferCreationAttributes<AuthToken>
> {
    declare token: string
    declare userId: string
    declare expiration: Date
}

AuthToken.init(
    {
        token: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        modelName: 'AuthToken',
        timestamps: true,
        sequelize: sequelize,
    },
)
