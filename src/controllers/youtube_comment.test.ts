import request from 'supertest'
import { app } from '../app'
import { baseUrl } from '../routes/routes'
import * as commentService from '../services/comments'
import { CommentData } from '../types/comment'

const dummyCommentData = {
    id: 'UgzH8vliQSJKHQMGZjx4AaABAg.9V8_MXpsbSv9V8_NNseQDx',
    parentId: 'UgzH8vliQSJKHQMGZjx4AaABAg',
    channelId: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
    videoId: '0e3GPea1Tyg',
    author: '@shrek3578',
    likeCount: 22324,
    text: 'shrek',
    sentiment: null,
    timeSubmitted: new Date(),
    timeArchived: new Date(),
    authorChannelId: 'channel1',
    authorChannelUrl: 'channel1url',
} as CommentData

describe('youTube Comment controller', () => {
    // test('should return status 200 for valid params', async () => {
    //     // Arrange
    //     const videoId = 'e6WuFNRP7e8'
    //     const maxResults = 30
    //     const mockDBSaveFunction = jest
    //         .spyOn(commentService, 'saveCommentWithReplies')
    //         .mockResolvedValue(dummyCommentData)
    //     // Act
    //     const res = await request(app).get(
    //         `${baseUrl}/comments/${videoId}/${maxResults}`,
    //     )
    //     // Assert
    //     expect(res.statusCode).toEqual(200)
    //     expect(mockDBSaveFunction).toHaveBeenCalled()
    // })
    test('should return a 400 error if max results is not valid', async () => {
        // Arrange
        const videoId = 'e6WuFNRP7e8'
        const maxResults = 'NN'
        // Act
        const res = await request(app).get(
            `${baseUrl}/comments/${videoId}/${maxResults}`,
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
        // Act
        const res = await request(app).get(
            `${baseUrl}/comments/${videoId}/${maxResults}`,
        )
        // Assert
        expect(res.statusCode).toEqual(400)
        expect(res.body).toEqual({ message: 'Invalid YouTube video Id' })
    })
    test('should return a 400 status if comments cannot be saved to DB', async () => {
        // Arrange
        const videoId = 'e6WuFNRP7e8'
        const maxResults = 30
        const errorMsg = 'This is a test error'
        jest.spyOn(commentService, 'saveCommentWithReplies').mockImplementation(
            () => {
                throw new Error(errorMsg)
            },
        )
        // Act
        const res = await request(app).get(
            `${baseUrl}/comments/${videoId}/${maxResults}`,
        )
        // Assert
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toContain(errorMsg)
    })
})
