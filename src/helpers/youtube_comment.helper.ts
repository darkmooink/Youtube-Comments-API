import { CONFIG } from './../config'
import { CommentListResponseSchema } from '../helpers/youtube_api_schema.helper'
import { CommentData } from '../types/comment'

const url = require('node:url')

export const buildRequestUrl = (
    videoId: string = 'QZ4BXGgmATU',
    pageNo: number = 1,
    pageSize: number = 10,
) => {
    const requestUrl: string = url.format({
        protocol: 'https',
        hostname: CONFIG.youtubeApiHostName,
        pathname: CONFIG.youtubeApiPathName,
        query: {
            key: CONFIG.youtubeApiKey,
            part: 'snippet,replies',
            videoId: videoId,
            maxResults: pageSize,
        },
    })
    return requestUrl
}

export const buildTestUrl = (videoId: string) => {
    const requestUrl: string = url.format({
        protocol: 'https',
        hostname: CONFIG.youtubeApiHostName,
        pathname: '/youtube/v3/videos',
        query: {
            key: CONFIG.youtubeApiKey,
            part: 'id',
            id: videoId,
        },
    })
    return requestUrl
}

export const parseYouTubeComments = (commentJson: object) => {
    const validatedCommentJson = CommentListResponseSchema.parse(commentJson)

    const items = validatedCommentJson.items || []
    const comments = items.map((item) => {
        const topLevelComment = item.snippet.topLevelComment

        const commentData: CommentData = {
            id: topLevelComment.id,
            parentId: null,
            channelId: topLevelComment.snippet.channelId,
            videoId: topLevelComment.snippet.videoId,
            author: topLevelComment.snippet.authorDisplayName,
            likeCount: topLevelComment.snippet.likeCount,
            text: topLevelComment.snippet.textDisplay,
            sentiment: null,
            timeSubmitted: new Date(topLevelComment.snippet.publishedAt),
            timeArchived: new Date(topLevelComment.snippet.updatedAt),
            authorChannelId: topLevelComment.snippet.authorChannelId.value,
            authorChannelUrl: topLevelComment.snippet.authorChannelUrl,
        }

        if (item.replies) {
            commentData.replies = []
            item.replies.comments.forEach((reply) => {
                commentData.replies?.push({
                    id: reply.id,
                    parentId: commentData.id,
                    channelId: reply.snippet.channelId,
                    videoId: reply.snippet.videoId,
                    author: reply.snippet.authorDisplayName,
                    likeCount: reply.snippet.likeCount,
                    text: reply.snippet.textDisplay,
                    sentiment: null,
                    timeSubmitted: new Date(reply.snippet.publishedAt),
                    timeArchived: new Date(reply.snippet.updatedAt),
                    authorChannelId: reply.snippet.authorChannelId.value,
                    authorChannelUrl: reply.snippet.authorChannelUrl,
                })
            })
        }

        return commentData
    })

    return comments
}
