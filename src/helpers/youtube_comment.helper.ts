import { CommentData, CommentItem, ISnippet } from './../types/comment.d'
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
            part: 'snippet,replies',
            videoId: videoId,
            maxResults: pageSize,
        },
    })
    return requestUrl
}

export const formatCommentList = (commentList: any) => {
    if (commentList && commentList.items && commentList.items.length) {
        const comments: CommentItem[] = commentList.items
        let commentArr: ISnippet[] = []

        for (let comment of comments) {
            let newCommentVal: ISnippet
            let replyArr: ISnippet[]
            if (comment.snippet) {
                if (comment.snippet.totalReplyCount === 0) {
                    newCommentVal = comment.snippet.topLevelComment
                        .snippet as ISnippet
                    commentArr = [...commentArr, newCommentVal]
                }

                if (comment.snippet.totalReplyCount) {
                    replyArr = comment.replies.comments.map(
                        (val) => val as ISnippet,
                    )
                    commentArr = [...commentArr, ...replyArr]
                }
            }
        }
        return commentArr
    }
}
