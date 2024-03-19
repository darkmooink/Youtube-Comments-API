import request from 'supertest'
import { app } from '../app'
// import { getAllYoutubeComments } from '../controllers/youtube_comment.controller'
import { baseUrl } from '../routes/routes'

describe('youTube Comment controller', () => {
    test('should return status 200 for valid params', async () => {
        // Arrange
        const videoId = 'e6WuFNRP7e8'
        const maxResults = 30
        // Act
        const res = await request(app).get(
            `${baseUrl}/comments/${videoId}/${maxResults}`,
        )
        // Assert
        expect(res.statusCode).toEqual(200)
    })
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
    })
})
