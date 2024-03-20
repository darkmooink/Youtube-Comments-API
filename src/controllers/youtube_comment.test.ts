import request from 'supertest'
import { app } from '../app'
import { baseUrl } from '../routes/routes'
import { Comment } from '../models/comment'
import { createTestCommentData } from '../helpers/test_data.helper'
import { CommentData } from '../types/comment'
import { sequelize } from '../database/database'
import * as commentService from '../services/comments'
import * as auth from '../services/authentication'
import * as youtubeCommentService from '../services/youtube_comment.service'

afterEach(async () => {
    jest.clearAllMocks()
})

const jsonYouTubeData = {
    kind: 'youtube#commentThreadListResponse',
    etag: '_Xex65NpgHFKt7R9Bu88f2Kqz4o',
    nextPageToken:
        'Z2V0X25ld2VzdF9maXJzdC0tQ2dnSWdBUVZGN2ZST0JJRkNLZ2dHQUFTQlFpSElCZ0FFZ1VJaVNBWUFCSUZDSWdnR0FBU0JRaWRJQmdCR0FBaURnb01DUHFLNjY0R0VKRHo2cFVE',
    pageInfo: {
        totalResults: 20,
        resultsPerPage: 20,
    },
    items: [
        {
            kind: 'youtube#commentThread',
            etag: 'EPpJVPozdS9H86cuwkIhUOkoEjE',
            id: 'UgwDtoBKna4Y0HAlOdB4AaABAg',
            snippet: {
                channelId: 'UCmXmlB4-HJytD7wek0Uo97A',
                videoId: 'wm5gMKuwSYk',
                topLevelComment: {
                    kind: 'youtube#comment',
                    etag: 'KG2MIrkCACr-gx_T0oBvOFKYxic',
                    id: 'UgwDtoBKna4Y0HAlOdB4AaABAg',
                    snippet: {
                        channelId: 'UCmXmlB4-HJytD7wek0Uo97A',
                        videoId: 'wm5gMKuwSYk',
                        textDisplay:
                            'If you want to truly master the most modern Next.js, check out: \u003ca href="https://www.jsmastery.pro/next14"\u003ehttps://www.jsmastery.pro/next14\u003c/a\u003e 🔥',
                        textOriginal:
                            'If you want to truly master the most modern Next.js, check out: https://www.jsmastery.pro/next14 🔥',
                        authorDisplayName: '@javascriptmastery',
                        authorProfileImageUrl:
                            'https://yt3.ggpht.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s48-c-k-c0x00ffffff-no-rj',
                        authorChannelUrl:
                            'http://www.youtube.com/@javascriptmastery',
                        authorChannelId: {
                            value: 'UCmXmlB4-HJytD7wek0Uo97A',
                        },
                        canRate: true,
                        viewerRating: 'none',
                        likeCount: 25,
                        publishedAt: '2023-09-24T09:15:25Z',
                        updatedAt: '2023-12-30T11:23:42Z',
                    },
                },
                canReply: true,
                totalReplyCount: 2,
                isPublic: true,
            },
        },
    ],
}

describe('youTube Comment controller', () => {
    test('should return status 200 for valid params', async () => {
        await sequelize.sync({ force: true })

        // Arrange
        const videoId = 'e6WuFNRP7e8'
        const maxResults = 30
        jest.spyOn(auth, 'authenticate').mockResolvedValue(true)

        const dummyCommentData: Array<CommentData> = []
        dummyCommentData[0] = await Comment.create(
            createTestCommentData('comment1'),
        )
        dummyCommentData[1] = await Comment.create(
            createTestCommentData('comment2'),
        )

        const mockYouTubeFunction = jest
            .spyOn(youtubeCommentService, 'getYoutubeVideoComments')
            .mockResolvedValue(jsonYouTubeData)

        const mockDBSaveFunction = jest
            .spyOn(commentService, 'saveCommentsWithSentiment')
            .mockResolvedValue(dummyCommentData)
        // Act
        const res = await request(app).get(
            `${baseUrl}/comments/${videoId}/${maxResults}?API_KEY=118e59a5-0ebd-4d7c-9006-dd81688659c0`,
        )
        // Assert
        expect(res.statusCode).toEqual(200)
        expect(mockDBSaveFunction).toHaveBeenCalled()
        expect(mockYouTubeFunction).toHaveBeenCalledWith(videoId, 1, maxResults)
    })

    test('should return a 400 error if max results is not valid', async () => {
        // Arrange
        const videoId = 'e6WuFNRP7e8'
        const maxResults = 'NN'
        jest.spyOn(auth, 'authenticate').mockResolvedValue(true)
        // Act
        const res = await request(app).get(
            `${baseUrl}/comments/${videoId}/${maxResults}?API_KEY=118e59a5-0ebd-4d7c-9006-dd81688659c0`,
        )
        // Assert
        expect(res.statusCode).toEqual(400)
        expect(res.body).toEqual({
            message: 'Invalid Max Results value - it must be a number',
        })
    })
    test('should return a 400 error if video ID is not valid', async () => {
        // Arrange
        const videoId = '123456'
        const maxResults = '30'
        jest.spyOn(auth, 'authenticate').mockResolvedValue(true)
        // Act
        const res = await request(app).get(
            `${baseUrl}/comments/${videoId}/${maxResults}?API_KEY=118e59a5-0ebd-4d7c-9006-dd81688659c0`,
        )
        // Assert
        expect(res.statusCode).toEqual(400)
        expect(res.body).toEqual({ message: 'Invalid YouTube video Id' })
    })
    test('should return a 400 status if comments cannot be saved to DB', async () => {
        // Arrange
        await sequelize.sync({ force: true })
        const videoId = 'e6WuFNRP7e8'
        const maxResults = 30
        const errorMsg = 'This is a test error'
        jest.spyOn(
            commentService,
            'saveCommentsWithSentiment',
        ).mockImplementation(() => {
            throw new Error(errorMsg)
        })
        jest.spyOn(auth, 'authenticate').mockResolvedValue(true)
        // Act
        const res = await request(app).get(
            `${baseUrl}/comments/${videoId}/${maxResults}?API_KEY=118e59a5-0ebd-4d7c-9006-dd81688659c0`,
        )
        // Assert
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toContain(errorMsg)
    })
})
