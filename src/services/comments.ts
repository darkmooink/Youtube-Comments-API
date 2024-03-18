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
    return Comment.create(commentData, {
        include: [
            {
                association: Comment.associations.replies,
            },
        ],
    })
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
