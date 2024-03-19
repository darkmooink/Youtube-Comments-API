import express from 'express'
import * as commentController from '../controllers/youtube_comment.controller'
import * as healthController from '../controllers/health_controller'

export const baseUrl = '/youtubecomments/api/v1'

export const router = express.Router()

router.get('/health', healthController.getHealthStatus)
router.get('/comments/:id/:maxResults', commentController.getAllYoutubeComments)
