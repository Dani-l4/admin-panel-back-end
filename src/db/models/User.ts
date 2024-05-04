import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    timestamps: true,
    tableName: 'users',
    modelName: 'User',
})
export default class User extends Model {
    @Column({
        primaryKey: true,
        unique: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string

    @Column({
        type: DataType.STRING,
    })
    declare name: string

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    declare email: string

    @Column(DataType.STRING)
    declare password: string

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    declare registeredAt: Date

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    declare lastLogin: Date

    @Column({
        type: DataType.ENUM('ACTIVE', 'BLOCKED'),
        defaultValue: 'ACTIVE',
    })
    declare status: string
}
