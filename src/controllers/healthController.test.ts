import * as healthController from './health_controller'
import * as healthService from '../services/health'
import { serverStatus } from '../types/health'

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
        const healthStatus = await healthController.getHealthStatus()
        // Assert
        expect(healthStatus.status).toEqual('Ok')
        expect(healthStatus.server.status).toEqual('Ok')
        expect(healthStatus.database.status).toEqual('Ok')
        expect(healthStatus.youTube.status).toEqual('Ok')
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
        const healthStatus = await healthController.getHealthStatus()
        // Assert
        expect(healthStatus.status).toEqual('Not Ok')
        expect(healthStatus.server.status).toEqual('Not Ok')
        expect(healthStatus.database.status).toEqual('Ok')
        expect(healthStatus.youTube.status).toEqual('Ok')
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
        const healthStatus = await healthController.getHealthStatus()
        // Assert
        expect(healthStatus.status).toEqual('Not Ok')
        expect(healthStatus.server.status).toEqual('Ok')
        expect(healthStatus.database.status).toEqual('Not Ok')
        expect(healthStatus.youTube.status).toEqual('Ok')
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
        const healthStatus = await healthController.getHealthStatus()
        // Assert
        expect(healthStatus.status).toEqual('Not Ok')
        expect(healthStatus.server.status).toEqual('Ok')
        expect(healthStatus.database.status).toEqual('Ok')
        expect(healthStatus.youTube.status).toEqual('Not Ok')
    })
})
