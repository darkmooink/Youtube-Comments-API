export type CommentData = {
    id: string
    parentId: string | null
    channelId: string
    videoId: string
    author: string
    likeCount: number
    text: string
    replies?: CommentData[]
    sentiment: number | null
    timeSubmitted: Date
    timeArchived: Date
    authorChannelId: string
    authorChannelUrl: string
}

export type CommentItem = {
    kind: string
    etag: string
    id: string
    snippet: ISnippet
    replies: Replies
}
export interface Comment {
    kind: string
    etag: string
    id: string
    snippet: ISnippet
}

export interface ISnippet {
    channelId: string
    videoId: string
    textDisplay: string
    textOriginal: string
    parentId: string
    authorDisplayName: string
    authorProfileImageUrl: string
    authorChannelUrl: string
    authorChannelId: Value
    canRate: boolean
    viewerRating: string
    likeCount: number
    publishedAt: string
    updatedAt: string
    totalReplyCount: number
    isPublic: boolean
    canReply: boolean
    topLevelComment: Comment
}

export type Value = { value: string }
export type Replies = { comments: ISnippet[] }
