import express from 'express'
import * as commentController from '../controllers/youtube_comment.controller'
import * as healthController from '../controllers/health_controller'
import { authenticate } from '../controllers/authentication'

export const baseUrl = '/youtubecomments/api/v1'

export const router = express.Router()

router.get('/health', healthController.getHealthStatus)

/////////////////////////////////////////////////////////////////
// ALL ROUTES BELOW THIS POINT NEED AN API KEY TO AUTHENTICATE //
/////////////////////////////////////////////////////////////////

router.use((req, res, next) => {
    authenticate(req, res, next)
})
router.get(
    '/comments/:id/:maxResults',
    commentController.saveCommentsWithSetiment,
)
