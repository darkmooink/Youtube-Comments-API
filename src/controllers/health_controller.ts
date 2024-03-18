import * as healthService from '../services/health'
import { statusJSON } from '../types/health'

export const getHealthStatus = async () => {
    const statusResponse: statusJSON = {
        status: 'Ok',
        server: { status: 'Ok' },
        database: { status: 'Ok' },
        youTube: { status: 'Ok' },
    }

    const serverStatus = healthService.getServerStatus()
    if (serverStatus.responseTime === BigInt(0) || serverStatus.uptime === 0) {
        statusResponse.status = 'Not Ok'
        statusResponse.server.status = 'Not Ok'
        statusResponse.server.details = `Error - no uptime or response time`
    } else {
        statusResponse.server.details = `${serverStatus}`
    }

    const dbStatus = await healthService.getDatabaseStatus()
    if (dbStatus === false) {
        statusResponse.status = 'Not Ok'
        statusResponse.database.status = 'Not Ok'
        statusResponse.database.details = 'Error - no response'
    } else {
        statusResponse.database.details = 'Responding'
    }

    const youTubeTest = await healthService.getYouTubeStatus()
    if (youTubeTest == false) {
        statusResponse.status = 'Not Ok'
        statusResponse.youTube.status = 'Not Ok'
        statusResponse.youTube.details = 'Error - no response'
    } else {
        statusResponse.youTube.details = 'Responding'
    }

    return statusResponse
}
