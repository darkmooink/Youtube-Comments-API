import { Request, Response } from 'express'
import * as commentService from '../services/youtube_comment.service'

export const getAllYoutubeComments = async (req: Request, res: Response) => {
    const commentList = await commentService.getYoutubeVideoComments(
        'dQw4w9WgXcQ',
        1,
        100,
    )
    // res.json(commentList).status(200)
    res.send(commentList)
}
