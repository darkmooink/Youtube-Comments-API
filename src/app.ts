import express from 'express'
import { router } from './routes/routes'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

export const app = express()

const swaggerConfiguration = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'YouTube Comment Analysis service',
            version: '0.1',
            description:
                'Need to analyse comments on a YouTube video to determine the tone, content and identify spam?' +
                '',
        },
    },
    apis: ['src/routes/routes.js', 'swagger-config.yaml'],
}
const specs = swaggerJSDoc(swaggerConfiguration)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(express.json())

app.get('/', (req, res) => res.send('Welcome to YouTube Comment Analysis API!'))

app.use('/', router)


