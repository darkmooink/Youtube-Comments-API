import * as healthController from './health_controller'
import * as youTubeCommentService from '../services/youtube_comment.service'

// jest.mock('../services/health')
jest.mock('../services/youtube_comment.service')

afterEach(() => {
    jest.clearAllMocks()
})

describe('getYouTubeStatus', () => {
    test('Returns true if YouTube API responds to call', async () => {
        // Arrange
        jest.spyOn(
            youTubeCommentService,
            'getYoutubeVideoComments',
        ).mockResolvedValue({})

        // Act
        const res = await healthController.getYouTubeStatus()
        // Assert
        expect(res).toBe(true)
    })
    test('Returns false if YouTube API fails to return a basic response', async () => {
        // Arrange
        jest.spyOn(
            youTubeCommentService,
            'getYoutubeVideoComments',
        ).mockResolvedValue(null)

        // Act
        const res = await healthController.getYouTubeStatus()
        // Assert
        expect(res).toBe(false)
    })
})

describe('getHealthStatus()', () => {
    test('Returns healthy response if all services running', () => {})
})
