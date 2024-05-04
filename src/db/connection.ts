import { Sequelize, DataType } from 'sequelize-typescript'
import User from './models/User.js'
import Session from './models/Session.js'

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.PG_DB_NAME,
    username: process.env.PG_USER,
    password: process.env.PG_USER_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    models: ['./models'],
})

sequelize.addModels([User, Session])

User.init(
    {
        id: {
            primaryKey: true,
            unique: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
        },
        name: {
            type: DataType.STRING,
            allowNull: true,
        },
        email: {
            type: DataType.STRING,
            unique: true,
        },
        password: {
            type: DataType.STRING,
        },
        registeredAt: {
            type: DataType.DATE,
            defaultValue: DataType.NOW,
        },
        lastLogin: {
            type: DataType.DATE,
            defaultValue: DataType.NOW,
        },
        status: {
            type: DataType.ENUM('ACTIVE', 'BLOCKED'),
            defaultValue: 'ACTIVE',
        },
    },
    { tableName: 'users', sequelize }
)

Session.init(
    {
        id: {
            primaryKey: true,
            unique: true,
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
        },
        refreshToken: DataType.STRING,
    },
    {
        tableName: 'sessions',
        sequelize,
    }
)

User.hasOne(Session, {
    sourceKey: 'id',
})

Session.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
})

try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

export default sequelize
