import process from 'process'
import { getComments } from '../services/comments'
import { Comment } from '../models/comment'
import { serverStatus } from '../types/health'
import { testYoutubeVideoId } from '../services/youtube_comment.service'

export const getServerStatus = (): serverStatus => {
    let serverUptime = 0
    let benchmark = BigInt(0)

    serverUptime = process.uptime()
    // High resolution real time in nanoseconds (BIGINT)
    const start = process.hrtime.bigint()
    let end = start
    setTimeout(() => {
        end = process.hrtime.bigint()
    }, 1000)
    benchmark = start === end ? start : end - start

    return { uptime: serverUptime, responseTime: benchmark }
}

export const getDatabaseStatus = async () => {
    const res: Comment[] = await getComments()

    if (res.length === 0) {
        return false
    }

    return true
}

export const getYouTubeStatus = async () => {
    const testResponse = await testYoutubeVideoId('dQw4w9WgXcQ')
    if (testResponse?.pageInfo.totalResults <= 0) {
        return false
    }
    return true
}
