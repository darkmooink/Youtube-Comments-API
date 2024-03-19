import { Request, Response } from 'express'
import * as youtubeCommentService from '../services/youtube_comment.service'
import * as commentService from '../services/comments'
import { CommentData } from '../types/comment'
import { parseYouTubeComments } from '../helpers/youtube_comment.helper'

export const getAllYoutubeComments = async (req: Request, res: Response) => {
    const videoId = req.params.id
  
    const testResponse = await youtubeCommentService.testYoutubeVideoId(videoId)
    if (testResponse.pageInfo.totalResults <= 0) {
        console.log('YouTube video not found')
        res.status(400).json({
            message: 'Invalid YouTube video Id',
        })
        return
    }

    const maxResults = parseInt(req.params.maxResults)
    if (Number.isNaN(maxResults) || !maxResults) {
        res.status(400).json({
            message: 'Invalid Max Results value - it must be a number',
        })
        return
    }

    const commentJson = await youtubeCommentService.getYoutubeVideoComments(
        videoId,
        1,
        maxResults,
    )
    if (!commentJson) {
        res.status(400).json({
            message: `No comments received from YouTube API for video ID: ${videoId}`,
        })
        return
    }

    try {
        const comments: CommentData[] = parseYouTubeComments(commentJson)
        comments.forEach((comment) =>
            commentService.saveCommentWithReplies(comment),
        )
        res.json(comments).status(200)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: `Error saving comments to database - ${error}`,
        })
    }
}
