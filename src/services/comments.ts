import { Comment } from '../models/comment'
import { CommentData } from '../types/comment'

export const getComments = async () => {
    return Comment.findAll()
}

export const getComment = async (id: string) => {
    return Comment.findOne({
        where: { id },
    })
}

export const saveComment = async (commentData: CommentData) => {
    return Comment.create<Comment>(commentData)
}

export const saveCommentWithReplies = async (commentData: CommentData) => {
    const { id, replies, ...commentProps } = commentData

    let [comment, created] = await Comment.findOrCreate({
        where: { id },
        defaults: { id, ...commentProps },
    })

    if (replies && replies.length > 0) {
        await handleReplies(comment, replies)
    }

    return comment
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
        const reply = await Comment.findOrCreate({
            where: { id },
            defaults: { id, ...commentProps },
        })
    }
}
