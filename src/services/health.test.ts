import * as healthService from '../services/health'
import * as commentService from '../services/comments'
import { Comment } from '../models/comment'

jest.mock('../services/comments')

afterEach(() => {
    jest.clearAllMocks()
})

const dummyCommentData = [
    {
        id: 'UgzH8vliQSJKHQMGZjx4AaABAg',
        channelId: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
        videoId: '0e3GPea1Tyg',
        author: '@MrBeast',
        likeCount: 1012838,
        text: 'Like I said in the video, subscribe if you haven’t already and you could win $10,000!',
    },
] as Comment[]

describe('getServerStatus', () => {
    // Jest does not seem able to mock NodeJS.process so further testing
    // is difficult as functions from process are called by getServerStatus
    test('should return values greater than zero if server is running', () => {
        // Act
        const serverStatus = healthService.getServerStatus()
        // Assert
        expect(serverStatus.uptime).toBeGreaterThan(0.0)
    })
})

describe('getDatabaseStatus', () => {
    test('should return true if the database is running', async () => {
        // Arrange
        jest.spyOn(commentService, 'getComments').mockResolvedValue(
            dummyCommentData as Comment[],
        )
        // Act
        const res = await healthService.getDatabaseStatus()
        console.log('res :>> ', res)
        // Assert
        expect(res).toBe(true)
    })
    test('should return false if no response is returned from database', async () => {
        // Arrange
        jest.spyOn(commentService, 'getComments').mockResolvedValue(
            [] as Comment[],
        )
        // Act
        const res = await healthService.getDatabaseStatus()
        // Assert
        expect(res).toBe(false)
    })
})
