import { CommentData } from '../types/comment'

export const createTestCommentData = (
    id: string,
    videoId: string = 'video1',
): CommentData => ({
    id: id,
    parentId: null,
    channelId: 'channel1',
    videoId: videoId,
    author: 'author1',
    likeCount: 10,
    text: 'This is the main comment',
    sentiment: null,
    timeSubmitted: new Date(),
    timeArchived: new Date(),
    authorChannelId: 'channel1',
    authorChannelUrl: 'channel1url',
})

export const createTestReplyData = (
    id: string,
    parentId: string,
    videoId: string = 'video1',
): CommentData => ({
    id: id,
    parentId: parentId,
    channelId: 'channel1',
    videoId: videoId,
    author: 'author1',
    likeCount: 10,
    text: 'This is a reply',
    sentiment: null,
    timeSubmitted: new Date(),
    timeArchived: new Date(),
    authorChannelId: 'channel1',
    authorChannelUrl: 'channel1url',
})

export const createTestCommentWithRepliesData = (
    commentId: string,
    replyIds: string[],
    videoId: string = 'video1',
): CommentData => {
    const comment = createTestCommentData(commentId, videoId)
    comment.replies = []
    replyIds.forEach((replyId) => {
        comment.replies?.push(createTestReplyData(replyId, commentId, videoId))
    })
    return comment
}
