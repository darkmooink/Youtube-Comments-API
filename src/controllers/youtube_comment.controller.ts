import { Request, Response } from 'express'
import * as youtubeCommentService from '../services/youtube_comment.service'
import * as commentService from '../services/comments'
import { CommentData } from '../types/comment'
import { parseYouTubeComments } from '../helpers/youtube_comment.helper'

export const getAllYoutubeComments = async (req: Request, res: Response) => {
    const commentJson = await youtubeCommentService.getYoutubeVideoComments(
        'QZ4BXGgmATU',
        1,
        100,
    )

    try {
        const comments: CommentData[] = parseYouTubeComments(commentJson)
        comments.forEach((comment) =>
            commentService.saveCommentWithReplies(comment),
        )
    } catch (e) {
        console.error(e)
    }

    res.send(commentJson)
}
