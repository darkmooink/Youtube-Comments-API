import { CommentData } from './../types/comment.d'
import * as commentHelper from '../helpers/youtube_comment.helper'

export const getYoutubeVideoComments = async (
    videoId: string,
    pageNo: number,
    pageSize: number,
) => {
    const requestUrl: string = commentHelper.buildRequestUrl(
        videoId,
        pageNo,
        pageSize,
    )

    try {
        if (requestUrl.length) {
            const response = await fetch(requestUrl)
            return await response.json()
        }
    } catch (error) {
        console.log('Unable to fetch - ', error)
        return null
    }
}

export const testYoutubeVideoId = async (videoId: string) => {
    const testUrl: string = commentHelper.buildTestUrl(videoId)

    console.log('testUrl :>> ', testUrl)
    try {
        const response = await fetch(testUrl)
        return await response.json()
    } catch (error) {
        console.log('Unable to fetch - ', error)
        return false
    }
}
