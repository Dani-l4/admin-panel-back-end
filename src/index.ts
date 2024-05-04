import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import AuthRouter from './routers/Auth.js'
import './db/connection.js'
import ResourceRouter from './routers/Resource.js'
import { Request, Response } from 'express-serve-static-core'

const app: Express = express()
const PORT = process.env.SERVER_PORT || 3000

app.use(cookieParser())
app.use(express.json())
app.use(cors({ credentials: true, origin: [`${process.env.CLIENT_URL}`] }))

app.get('/', (_: Request, res: Response) => {
    res.json('Hello')
})
app.use('/auth', AuthRouter)
app.use('/admin', ResourceRouter)

app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT} port.`)
})

export default app
