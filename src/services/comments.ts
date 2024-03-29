import { Comment } from '../models/comment'
import { CommentData } from '../types/comment'
import { parseYouTubeCommentsWithSentiment } from '../helpers/youtube_comment.helper'

export const getComments = async () => {
    return Comment.findAll()
}

export const getComment = async (id: string) => {
    return Comment.findOne({
        where: { id },
    })
}

export const getTopLevelCommentsByVideoId = async (
    videoId: string,
): Promise<CommentData[]> => {
    try {
        const topLevelComments = await Comment.findAll({
            where: {
                videoId: videoId,
                parentId: null,
            },
        })
        return topLevelComments
    } catch (error) {
        console.error('Error fetching top-level comments:', error)
        throw error
    }
}

export const saveComment = async (commentData: CommentData) => {
    const { id, ...commentProps } = commentData

    let [comment, created] = await Comment.findOrCreate({
        where: { id },
        defaults: { id, ...commentProps },
    })

    return comment
}

export const saveCommentWithReplies = async (commentData: CommentData) => {
    const { id, replies, ...commentProps } = commentData

    let comment = await saveComment({ id, ...commentProps })

    if (replies && replies.length > 0) {
        await handleReplies(comment, replies)
    }

    return comment
}

export const saveAllCommentsWithReplies = async (comments: CommentData[]) => {
    comments.forEach((comment) => {
        saveCommentWithReplies(comment)
    })

    return comments
}

export const updateComment = async (id: string, updates: Partial<Comment>) => {
    return Comment.update(updates, {
        where: {
            id,
        },
    })
}

export const deleteComment = async (id: string) => {
    return Comment.destroy({
        where: {
            id,
        },
    })
}

export const addReply = async (parentId: string, replyData: CommentData) => {
    const parentComment = await Comment.findByPk(parentId)
    if (!parentComment) {
        throw new Error('Parent comment not found')
    }
    const reply = await Comment.create<Comment>({ ...replyData, parentId })
    return reply
}

export const getReplies = async (parentId: string) => {
    const parentComment = await Comment.findByPk(parentId)
    if (!parentComment) {
        throw new Error('Parent comment not found')
    }
    const replies = await parentComment.getReplies()
    return replies
}

const handleReplies = async (comment: CommentData, replies: CommentData[]) => {
    for (const replyData of replies) {
        const { id, ...commentProps } = replyData
        const comment = await saveComment({ id, ...commentProps })
    }
    return comment
}

export const saveCommentsWithSentiment = async (commentJson: object) => {
    let commentsWithSentiment: CommentData[] =
        parseYouTubeCommentsWithSentiment(commentJson)
    return await saveAllCommentsWithReplies(commentsWithSentiment)
}
