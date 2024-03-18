import { CommentData } from '../types/comment'

export const createTestCommentData = (id: string): CommentData => ({
    id: id,
    parentId: null,
    channelId: 'channel1',
    videoId: 'video1',
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
): CommentData => ({
    id: id,
    parentId: parentId,
    channelId: 'channel1',
    videoId: 'video1',
    author: 'author1',
    likeCount: 10,
    text: 'This is a reply',
    sentiment: null,
    timeSubmitted: new Date(),
    timeArchived: new Date(),
    authorChannelId: 'channel1',
    authorChannelUrl: 'channel1url',
})

export const createTestCommentWithRepliesData = (): CommentData => {
    const commentId = 'comment1'
    const comment = createTestCommentData(commentId)
    comment.replies = [
        createTestReplyData('reply1', commentId),
        createTestReplyData('reply2', commentId),
    ]
    return comment
}
