import { z } from 'zod'

const AuthorChannelIdSchema = z.object({
    value: z.string(),
})

const CommentSnippetSchema = z.object({
    channelId: z.string(),
    videoId: z.string(),
    textDisplay: z.string(),
    textOriginal: z.string(),
    authorDisplayName: z.string(),
    authorProfileImageUrl: z.string(),
    authorChannelUrl: z.string(),
    authorChannelId: AuthorChannelIdSchema,
    canRate: z.boolean(),
    viewerRating: z.string(),
    likeCount: z.number(),
    publishedAt: z.string(),
    updatedAt: z.string(),
    parentId: z.string().optional(),
})

const CommentSchema = z.object({
    kind: z.string(),
    etag: z.string(),
    id: z.string(),
    snippet: CommentSnippetSchema,
})

const RepliesSchema = z.object({
    comments: z.array(CommentSchema),
})

const TopLevelCommentSchema = z.object({
    kind: z.string(),
    etag: z.string(),
    id: z.string(),
    snippet: CommentSnippetSchema,
})

const CommentThreadSnippetSchema = z.object({
    channelId: z.string(),
    videoId: z.string(),
    topLevelComment: TopLevelCommentSchema,
    canReply: z.boolean(),
    totalReplyCount: z.number(),
    isPublic: z.boolean(),
})

const CommentThreadSchema = z.object({
    kind: z.string(),
    etag: z.string(),
    id: z.string(),
    snippet: CommentThreadSnippetSchema,
    replies: RepliesSchema.optional(),
})

const PageInfoSchema = z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
})

export const CommentListResponseSchema = z.object({
    kind: z.string(),
    etag: z.string(),
    nextPageToken: z.string().optional(),
    pageInfo: PageInfoSchema,
    items: z.array(CommentThreadSchema),
})
