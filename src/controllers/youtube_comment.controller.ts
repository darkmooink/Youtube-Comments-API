import { Request, Response } from 'express'
import * as youtubeCommentService from '../services/youtube_comment.service'
import { saveCommentsWithSentiment } from '../services/comments'

export const getAndSaveVideoCommentsWithSentiment = async (
    req: Request,
    res: Response,
) => {
    const videoId = req.params.id
    if (typeof videoId !== 'string')
        res.status(400).json({ message: 'Invalid YoutubeId Id' })

    const maxResults = parseInt(req.params.maxResults)
    if (Number.isNaN(maxResults) || !maxResults)
        res.status(400).json({
            message: 'Invalid Max Results value - it must be a number',
        })

    const commentJson = await youtubeCommentService.getYoutubeVideoComments(
        videoId,
        1,
        maxResults,
    )

    try {
        const comments = await saveCommentsWithSentiment(commentJson)
        res.json(comments).status(200)
    } catch (e) {
        console.error(e)
    }
}
