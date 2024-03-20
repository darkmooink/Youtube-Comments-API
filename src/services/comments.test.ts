import { create } from 'lodash'
import { sequelize } from '../database/database'
import { Comment } from '../models/comment'
import { CommentData } from '../types/comment'
import * as commentService from './comments'
import {
    createTestCommentData,
    createTestReplyData,
    createTestCommentWithRepliesData,
} from '../helpers/test_data.helper'

beforeAll(async () => {
    await sequelize.sync({ force: true })
})

afterEach(async () => {
    await Comment.truncate()
})

describe('getComments', () => {
    test('should return an empty array when no comments are present', async () => {
        const comments = await commentService.getComments()
        expect(comments).toEqual([])
    })

    test('should return all comments', async () => {
        await Comment.create(createTestCommentData('comment1'))
        await Comment.create(createTestCommentData('comment2'))

        const comments = await commentService.getComments()
        expect(comments.length).toBe(2)
    })
})

describe('getComment', () => {
    test('should return null if comment does not exist', async () => {
        const comment = await commentService.getComment('non_existing_id')
        expect(comment).toBeNull()
    })

    test('should return the correct comment when it exists', async () => {
        const newComment = await Comment.create(
            createTestCommentData('comment1'),
        )

        const comment = await commentService.getComment(newComment.id)
        expect(comment).not.toBeNull()
        expect(comment?.id).toBe(newComment.id)
    })
})

describe('saveComment', () => {
    test('should save a new comment', async () => {
        const commentData: CommentData = createTestCommentData('comment1')

        const savedComment = await commentService.saveComment(commentData)
        expect(savedComment).not.toBeNull()
        expect(savedComment.id).toBe(commentData.id)
    })
})

describe('updateComment', () => {
    test('should update an existing comment', async () => {
        const originalComment = await Comment.create(
            createTestCommentData('comment1'),
        )

        const updatedText = 'Updated text'
        await commentService.updateComment(originalComment.id, {
            text: updatedText,
        })

        const updatedComment = await Comment.findByPk(originalComment.id)
        expect(updatedComment).not.toBeNull()
        expect(updatedComment?.text).toBe(updatedText)
    })
})

describe('deleteComment', () => {
    test('should delete an existing comment', async () => {
        const commentToDelete = await Comment.create(
            createTestCommentData('comment1'),
        )

        await commentService.deleteComment(commentToDelete.id)
        const deletedComment = await Comment.findByPk(commentToDelete.id)
        expect(deletedComment).toBeNull()
    })
})

describe('addReply', () => {
    test('should add a reply to an existing comment', async () => {
        const parentComment = await Comment.create(
            createTestCommentData('comment1'),
        )

        const replyData: CommentData = createTestReplyData(
            'reply1',
            parentComment.id,
        )

        const replyComment = await commentService.addReply(
            parentComment.id,
            replyData,
        )
        expect(replyComment).not.toBeNull()
        expect(replyComment.parentId).toBe(parentComment.id)
    })

    test('should throw an error if the parent comment does not exist', async () => {
        const replyData: CommentData = createTestReplyData(
            'reply1',
            'nonexisting_parent_id',
        )

        await expect(
            commentService.addReply('non_existing_parent_id', replyData),
        ).rejects.toThrow('Parent comment not found')
    })
})

describe('getReplies', () => {
    test('should get replies for an existing comment', async () => {
        const parentComment = await Comment.create(
            createTestCommentData('comment1'),
        )

        const replyData: CommentData = createTestReplyData(
            'reply1',
            parentComment.id,
        )

        await Comment.create(replyData)

        const replies = await commentService.getReplies(parentComment.id)
        expect(replies).not.toBeNull()
        expect(replies.length).toBe(1)
        expect(replies[0].id).toBe(replyData.id)
    })

    test('should throw an error if the parent comment does not exist', async () => {
        await expect(
            commentService.getReplies('non_existing_parent_id'),
        ).rejects.toThrow('Parent comment not found')
    })
})

describe('saveCommentWithReplies', () => {
    it('should save a comment with replies', async () => {
        const commentData = createTestCommentWithRepliesData('comment1', [
            'reply1',
            'reply2',
        ])

        expect(commentData.replies).toBeDefined()

        if (!commentData.replies) {
            throw new Error('Replies are undefined in the test data')
        }

        const savedComment = await commentService.saveCommentWithReplies(
            commentData,
        )

        expect(savedComment).toBeDefined()
        expect(savedComment.id).toBeDefined()
        expect(savedComment.text).toEqual(commentData.text)

        const replies = await savedComment.getReplies()

        expect(replies).toHaveLength(commentData.replies.length)
        replies.forEach((reply, index) => {
            expect(reply).toBeDefined()
            expect(reply.text).toEqual(commentData.replies![index].text)
        })
    })
})

describe('getTopLevelCommentsByVideoId', () => {
    test('should return an empty array when no top-level comments are present for a video', async () => {
        const videoId = 'video_with_no_comments'
        const topLevelComments =
            await commentService.getTopLevelCommentsByVideoId(videoId)
        expect(topLevelComments).toEqual([])
    })

    test('should return only top-level comments for a specific video', async () => {
        const commentId = 'comment1'
        const replyIds = ['reply1', 'reply2']
        const videoId = 'video1'

        const commentData = createTestCommentWithRepliesData(
            commentId,
            replyIds,
            videoId,
        )

        await commentService.saveCommentWithReplies(commentData)

        const topLevelComments =
            await commentService.getTopLevelCommentsByVideoId(videoId)

        expect(topLevelComments.length).toBe(1)
        topLevelComments.forEach((comment) => {
            expect(comment.parentId).toBeNull()
            expect(comment.videoId).toBe(videoId)
        })
    })
})
