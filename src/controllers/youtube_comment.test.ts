import request from 'supertest'
import { app } from '../app'
import { baseUrl } from '../routes/routes'
import * as commentService from '../services/comments'
import * as auth from '../services/authentication'

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
    //         `${baseUrl}/comments/${videoId}/${maxResults}?API_KEY=118e59a5-0ebd-4d7c-9006-dd81688659c0`,
    //     )
    //     // Assert
    //     expect(res.statusCode).toEqual(200)
    //     expect(mockDBSaveFunction).toHaveBeenCalled()
    // })

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
        const videoId = 'e6WuFNRP7e8'
        const maxResults = 30
        const errorMsg = 'This is a test error'
        jest.spyOn(commentService, 'saveCommentWithReplies').mockImplementation(
            () => {
                throw new Error(errorMsg)
            },
        )
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
