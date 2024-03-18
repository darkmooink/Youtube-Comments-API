import * as commentHelper from '../helpers/youtube_comment.helper'

export const getYoutubeVideoComments = async (
    videoId: string = 'QZ4BXGgmATU',
    pageNo: number = 1,
    pageSize: number = 1,
) => {
    const requestUrl: string = commentHelper.buildRequestUrl(
        videoId,
        pageNo,
        pageSize,
    )

    try {
        if (requestUrl.length) {
            const response = await fetch(requestUrl)
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log('Unable to fetch -', error)
    }
}
