import express from 'express'
import * as commentController from '../controllers/youtube_comment.controller'
import * as healthController from '../controllers/health_controller'
import { authenticate } from '../controllers/authentication'
import * as analyisisController from '../controllers/analyisis'

export const baseUrl = '/youtubecomments/api/v1'

export const router = express.Router()

router.get('/health', healthController.getHealthStatus)
router.get('/', (req, res) => {
    res.redirect(baseUrl + '/api-docs')
})

/////////////////////////////////////////////////////////////////
// ALL ROUTES BELOW THIS POINT NEED AN API KEY TO AUTHENTICATE //
/////////////////////////////////////////////////////////////////

router.use((req, res, next) => {
    authenticate(req, res, next)
})

router.get('/analysis/:id/:maxResults', analyisisController.getCommentAnalysis)
router.get(
    '/comments/:id/:maxResults',
    commentController.getAndSaveVideoCommentsWithSentiment,
)

/////////////////////////////////////////////////////////////////
// AUTHENTICATED TESTING END POINTS HERE                       //
/////////////////////////////////////////////////////////////////
router.get('/authTest',(req, res, next) => {
    res.status(200).json('')
})