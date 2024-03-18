import { Request, Response } from 'express'
import * as commentService from '../services/youtube_comment.service'

export const getAllYoutubeComments = async (req: Request, res: Response) => {
    const commentList = await commentService.getYoutubeVideoComments(
        'QZ4BXGgmATU',
        1,
        1,
    )
    // res.json(commentList).status(200)
    res.send(commentList)
}
