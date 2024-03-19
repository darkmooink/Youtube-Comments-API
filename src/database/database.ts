import { Dialect, Sequelize } from 'sequelize'

export let sequelize = new Sequelize('sqlite::memory:', { logging: false })

if (process.env.NODE_ENV !== 'test') {
    sequelize = new Sequelize(
        process.env.DB_NAME ?? 'MISSING_DB_NAME_CONFIG',

        process.env.DB_USERNAME ?? 'MISSING_DB_USERNAME_CONFIG',

        process.env.DB_PASSWORD ?? 'MISSING_DB_PASSWORD_CONFIG',
        {
            host: process.env.DB_HOST ?? 'MISSING_DB_HOST_CONFIG',
            port:
                parseInt(process.env.DB_PORT as string) ??
                'MISSING_DB_PORT_CONFIG',
            dialect: (process.env.DB_DIALECT as Dialect) ?? 'postgres',
        },
    )
}
