import { Request, Response } from 'express'
import * as youtubeCommentService from '../services/youtube_comment.service'
import { CommentData } from '../types/comment'
import { parseYouTubeComments } from '../helpers/youtube_comment.helper'
import { getSentimentAnalysisAndStatsFromComments } from '../services/sentamentAnalysis'

export const getCommentAnalysis = async (req: Request, res: Response) => {
    console.log("test--------------------------------------------------------")
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
        const comments: CommentData[] = parseYouTubeComments(commentJson)
        const analysis = getSentimentAnalysisAndStatsFromComments(comments)

        res.json(analysis).status(200)
    } catch (e) {
        console.error(e)
    }
}
