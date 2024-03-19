import { Request, Response } from 'express'
import * as commentService from '../services/youtube_comment.service'

export const getAllYoutubeComments = async (req: Request, res: Response) => {
    const videoId = req.params.id
    const maxResults = parseInt(req.params.maxResults)
    const commentList = await commentService.getYoutubeVideoComments(
        videoId,
        1,
        maxResults,
    )
    res.json(commentList).status(200)
}
