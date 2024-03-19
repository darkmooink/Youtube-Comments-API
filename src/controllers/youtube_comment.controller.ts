import { Request, Response } from 'express'
import * as youtubeCommentService from '../services/youtube_comment.service'
import * as commentService from '../services/comments'
import { CommentData } from '../types/comment'
import { parseYouTubeComments } from '../helpers/youtube_comment.helper'

export const getAllYoutubeComments = async (req: Request, res: Response) => {
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
    if (!commentJson) {
        res.status(400).json({
            message: `No comments received from YouTube API for video ID: ${videoId}`,
        })
    }

    try {
        const comments: CommentData[] = parseYouTubeComments(commentJson)
        comments.forEach((comment) =>
            commentService.saveCommentWithReplies(comment),
        )
        res.json(comments).status(200)
    } catch (e) {
        console.error(e)
    }
}
