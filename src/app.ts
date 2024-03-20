import express from 'express'
import { router } from './routes/routes'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { baseUrl } from './routes/routes'

export const app = express()

const swaggerConfiguration = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'YouTube Comment Analysis service',
            version: '0.1',
            description:
                'Welcome to the YouTube Comment Analysis Service. We can analyse comments on your YouTube video and help you determine the ' +
                "sentiment/tone and content. This can help you to gauge your audience's reactions and improve your relationship with your community. " +
                'Please note: for the structure of the comment schema please refer to the YouTube DataApi documentation',
        },
    },
    apis: ['src/routes/routes.js', 'swagger-config.yaml'],
}
const specs = swaggerJSDoc(swaggerConfiguration)
app.use(`${baseUrl}/api-docs`, swaggerUi.serve, swaggerUi.setup(specs))

app.use(express.json())

app.use(baseUrl, router)
