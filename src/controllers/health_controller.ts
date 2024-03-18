// Nested JSON object to indicate status of each service
// the API relies on.
export type statusJSON = {
    status: string
    server: {
        status: string
        details?: string
    }
    database: {
        status: string
        details?: string
    }
    youTube: {
        status: string
        details?: string
    }
}

import * as healthService from '../services/health'
import { getYoutubeVideoComments } from '../services/youtube_comment.service'

export const getHealthStatus = () => {
    // const statusResponse: statusJSON = {
    //     status: '',
    //     server: { status: '' },
    //     database: { status: '' },
    //     youTube: { status: '' },
    // }
    // healthService.getServerStatus()
}

export const getYouTubeStatus = async () => {
    // TODO: There needs to be an error return value from this function.
    const result = await getYoutubeVideoComments()
    if (result === null) {
        return false
    }
    return true
}

const getDatabaseStatus = async () => {}