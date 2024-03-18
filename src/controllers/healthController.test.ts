import request from 'supertest'
import { app } from '../app'
import * as healthService from '../services/health'
import { serverStatus } from '../types/health'
import { baseUrl } from '../routes/routes'

jest.mock('../services/health')
jest.mock('../services/youtube_comment.service')

afterEach(() => {
    jest.clearAllMocks()
})

describe('getHealthStatus()', () => {
    test('Returns healthy response if all services running', async () => {
        // Arrange
        jest.spyOn(healthService, 'getServerStatus').mockReturnValue({
            uptime: 5.899,
            responseTime: BigInt(Number.MAX_SAFE_INTEGER),
        } as serverStatus)
        jest.spyOn(healthService, 'getDatabaseStatus').mockResolvedValue(true)
        jest.spyOn(healthService, 'getYouTubeStatus').mockResolvedValue(true)

        // Act
        const res = await request(app).get(`${baseUrl}/health`)
        // Assert
        expect(res.body.status).toEqual('Ok')
        expect(res.body.server.status).toEqual('Ok')
        expect(res.body.database.status).toEqual('Ok')
        expect(res.body.youTube.status).toEqual('Ok')
    })

    test('Returns Not Ok response if server is not responding', async () => {
        // Arrange
        jest.spyOn(healthService, 'getServerStatus').mockReturnValue({
            uptime: 0,
            responseTime: BigInt(0),
        } as serverStatus)
        jest.spyOn(healthService, 'getYouTubeStatus').mockResolvedValue(true)
        jest.spyOn(healthService, 'getDatabaseStatus').mockResolvedValue(true)

        // Act
        const res = await request(app).get(`${baseUrl}/health`)
        // Assert
        expect(res.body.status).toEqual('Not Ok')
        expect(res.body.server.status).toEqual('Not Ok')
        expect(res.body.database.status).toEqual('Ok')
        expect(res.body.youTube.status).toEqual('Ok')
    })
    test('Returns Not Ok response if server is not responding', async () => {
        // Arrange
        jest.spyOn(healthService, 'getServerStatus').mockReturnValue({
            uptime: 5.899,
            responseTime: BigInt(Number.MAX_SAFE_INTEGER),
        } as serverStatus)
        jest.spyOn(healthService, 'getYouTubeStatus').mockResolvedValue(true)
        jest.spyOn(healthService, 'getDatabaseStatus').mockResolvedValue(false)

        // Act
        const res = await request(app).get(`${baseUrl}/health`)
        // Assert
        expect(res.body.status).toEqual('Not Ok')
        expect(res.body.server.status).toEqual('Ok')
        expect(res.body.database.status).toEqual('Not Ok')
        expect(res.body.youTube.status).toEqual('Ok')
    })
    test('Returns Not Ok response if YouTube API is not responding', async () => {
        // Arrange
        jest.spyOn(healthService, 'getServerStatus').mockReturnValue({
            uptime: 5.899,
            responseTime: BigInt(Number.MAX_SAFE_INTEGER),
        } as serverStatus)
        jest.spyOn(healthService, 'getYouTubeStatus').mockResolvedValue(false)
        jest.spyOn(healthService, 'getDatabaseStatus').mockResolvedValue(true)

        // Act
        const res = await request(app).get(`${baseUrl}/health`)
        // Assert
        expect(res.body.status).toEqual('Not Ok')
        expect(res.body.server.status).toEqual('Ok')
        expect(res.body.database.status).toEqual('Ok')
        expect(res.body.youTube.status).toEqual('Not Ok')
    })
})
