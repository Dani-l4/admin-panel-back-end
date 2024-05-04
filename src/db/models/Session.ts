import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export default class Session extends Model {
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
    declare refreshToken: string
}
