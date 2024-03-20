import { Comment } from '../models/comment'
import { AuthToken } from '../models/authToken'
const { v4: uuidv4 } = require('uuid')

export const populateDummyData = async () => {
    // Populate environment with some dummy data in dev
    console.log('🍼 Populating database with dummy data')
    await Comment.sync({ force: true })
    await Comment.create({
        id: 'UgzH8vliQSJKHQMGZjx4AaABAg',
        channelId: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
        videoId: '0e3GPea1Tyg',
        author: '@MrBeast',
        likeCount: 1012838,
        text: 'Like I said in the video, subscribe if you haven’t already and you could win $10,000!',
        sentiment: null,
        timeSubmitted: new Date(),
        timeArchived: new Date(),
        authorChannelId: 'channel1',
        authorChannelUrl: 'channel1url',
    })
    await Comment.create({
        id: 'UgzH8vliQSJKHQMGZjx4AaABAg.9V8_MXpsbSv9V8_NNseQDx',
        parentId: 'UgzH8vliQSJKHQMGZjx4AaABAg',
        channelId: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
        videoId: '0e3GPea1Tyg',
        author: '@shrek3578',
        likeCount: 22324,
        text: 'shrek',
        sentiment: null,
        timeSubmitted: new Date(),
        timeArchived: new Date(),
        authorChannelId: 'channel1',
        authorChannelUrl: 'channel1url',
    })
    await Comment.create({
        id: 'UgzH8vliQSJKHQMGZjx4AaABAg.9V8_MXpsbSv9V8_NOFPBTj',
        parentId: 'UgzH8vliQSJKHQMGZjx4AaABAg.9V8_MXpsbSv9V8_NNseQDx',
        channelId: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
        videoId: '0e3GPea1Tyg',
        author: '@streamingksivsalexwassabi4190',
        likeCount: 22324,
        text: 'Who else loves Mrbeast?\n\n👇',
        sentiment: null,
        timeSubmitted: new Date(),
        timeArchived: new Date(),
        authorChannelId: 'channel1',
        authorChannelUrl: 'channel1url',
    })
    const commentCount = (await Comment.findAll()).length
    console.log(
        `📚 ${commentCount} comment${
            commentCount !== 1 ? 's' : ''
        } added to table`,
    )

    await AuthToken.sync({ force: true })
    const tokens = [
        '118e59a5-0ebd-4d7c-9006-dd81688659c0',
        '9723667a-1fbe-4998-ae25-a832e1f9aae2',
        'da600c1c-ac5f-4be1-9a80-d738898819dd',
    ]
    tokens.forEach(async (token) => {
        await AuthToken.create({
            token: token,
            userId: uuidv4(),
            expiration: new Date(),
        })
    })
}
