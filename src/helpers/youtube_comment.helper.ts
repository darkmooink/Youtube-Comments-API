import { CONFIG } from './../config'
const url = require('node:url')

export const buildRequestUrl = (
    videoId: string = 'QZ4BXGgmATU',
    pageNo: number = 1,
    pageSize: number = 1,
) => {
    const requestUrl: string = url.format({
        protocol: 'https',
        hostname: CONFIG.youtubeApiHostName,
        pathname: CONFIG.youtubeApiPathName,
        query: {
            key: CONFIG.youtubeApiKey,
            part: 'snippet',
            videoId: videoId,
            maxResults: pageSize,
        },
    })
    return requestUrl
}
