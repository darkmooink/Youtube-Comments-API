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
            const data = await response.json()
            const dataArr = commentHelper.formatCommentList(data)
            console.log(dataArr)
            return dataArr
        }
    } catch (error) {
        console.log('Unable to fetch -', error)
    }
}
