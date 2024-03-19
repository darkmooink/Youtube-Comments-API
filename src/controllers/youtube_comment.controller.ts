import { Request, Response } from 'express'
import * as commentService from '../services/youtube_comment.service'

export const getAllYoutubeComments = async (req: Request, res: Response) => {
    const videoId = req.params.id
    if (typeof videoId !== 'string')
        res.status(400).json({ message: 'Invalid YoutubeId Id' })

    const maxResults = parseInt(req.params.maxResults)
    if (Number.isNaN(maxResults) || !maxResults)
        res.status(400).json({
            message: 'Invalid Max Results value - it must be a number',
        })

    const commentList = await commentService.getYoutubeVideoComments(
        videoId,
        1,
        maxResults,
    )
    res.json(commentList).status(200)
}
