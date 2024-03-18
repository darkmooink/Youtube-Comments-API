import { sequelize } from "../database/database";
import { Comment } from "../models/comment";
import { CommentData } from "../types/comment";
import * as commentService from "./comments";

const createTestCommentData = (): CommentData => ({
  id: "comment1",
  parentId: null,
  channelId: "channel1",
  videoId: "video1",
  author: "author1",
  likeCount: 10,
  text: "This is the main comment",
  replies: [
    {
      id: "reply1",
      parentId: "comment1",
      channelId: "channel1",
      videoId: "video1",
      author: "author2",
      likeCount: 5,
      text: "This is a reply",
    },
    {
      id: "reply2",
      parentId: "comment1",
      channelId: "channel1",
      videoId: "video1",
      author: "author3",
      likeCount: 10,
      text: "This is a reply",
    },
  ],
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await Comment.truncate();
});

describe("getComments", () => {
  test("should return an empty array when no comments are present", async () => {
    const comments = await commentService.getComments();
    expect(comments).toEqual([]);
  });

  test("should return all comments", async () => {
    await Comment.create({
      id: "UgzH8vliQSJKHQMGZjx4AaABAg",
      channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
      videoId: "0e3GPea1Tyg",
      author: "@MrBeast",
      likeCount: 1012838,
      text: "Like I said in the video, subscribe if you haven’t already and you could win $10,000!",
    });
    await Comment.create({
      id: "UgzH8vliQSJKHQMGZjx4AaABAg.9V8_MXpsbSv9V8_NNseQDx",
      parentId: "UgzH8vliQSJKHQMGZjx4AaABAg",
      channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
      videoId: "0e3GPea1Tyg",
      author: "@shrek3578",
      likeCount: 22324,
      text: "shrek",
    });

    const comments = await commentService.getComments();
    expect(comments.length).toBe(2);
  });
});

describe("getComment", () => {
  test("should return null if comment does not exist", async () => {
    const comment = await commentService.getComment("non_existing_id");
    expect(comment).toBeNull();
  });

  test("should return the correct comment when it exists", async () => {
    const newComment = await Comment.create({
      id: "some_unique_id",
      channelId: "some_channel_id",
      videoId: "some_video_id",
      author: "@user",
      likeCount: 100,
      text: "This is a comment",
    });

    const comment = await commentService.getComment(newComment.id);
    expect(comment).not.toBeNull();
    expect(comment?.id).toBe(newComment.id);
  });
});

describe("saveComment", () => {
  test("should save a new comment", async () => {
    const commentData: CommentData = {
      id: "new_comment_id",
      parentId: null,
      channelId: "new_channel_id",
      videoId: "new_video_id",
      author: "@newuser",
      likeCount: 50,
      text: "New comment text",
    };

    const savedComment = await commentService.saveComment(commentData);
    expect(savedComment).not.toBeNull();
    expect(savedComment.id).toBe(commentData.id);
  });
});

describe("updateComment", () => {
  test("should update an existing comment", async () => {
    const originalComment = await Comment.create({
      id: "update_comment_id",
      channelId: "update_channel_id",
      videoId: "update_video_id",
      author: "@originaluser",
      likeCount: 100,
      text: "Original text",
    });

    const updatedText = "Updated text";
    await commentService.updateComment(originalComment.id, {
      text: updatedText,
    });

    const updatedComment = await Comment.findByPk(originalComment.id);
    expect(updatedComment).not.toBeNull();
    expect(updatedComment?.text).toBe(updatedText);
  });
});

describe("deleteComment", () => {
  test("should delete an existing comment", async () => {
    const commentToDelete = await Comment.create({
      id: "delete_comment_id",
      channelId: "delete_channel_id",
      videoId: "delete_video_id",
      author: "@tobedeleted",
      likeCount: 10,
      text: "Delete me",
    });

    await commentService.deleteComment(commentToDelete.id);
    const deletedComment = await Comment.findByPk(commentToDelete.id);
    expect(deletedComment).toBeNull();
  });
});

describe("addReply", () => {
  test("should add a reply to an existing comment", async () => {
    const parentComment = await Comment.create({
      id: "parent_comment_id",
      channelId: "parent_channel_id",
      videoId: "parent_video_id",
      author: "@parentuser",
      likeCount: 100,
      text: "Parent comment text",
    });

    const replyData: CommentData = {
      id: "reply_comment_id",
      parentId: parentComment.id,
      channelId: "reply_channel_id",
      videoId: "reply_video_id",
      author: "@replyuser",
      likeCount: 20,
      text: "Reply comment text",
    };

    const replyComment = await commentService.addReply(
      parentComment.id,
      replyData
    );
    expect(replyComment).not.toBeNull();
    expect(replyComment.parentId).toBe(parentComment.id);
  });

  test("should throw an error if the parent comment does not exist", async () => {
    const replyData: CommentData = {
      id: "reply_comment_id",
      parentId: "non_existing_parent_id",
      channelId: "reply_channel_id",
      videoId: "reply_video_id",
      author: "@replyuser",
      likeCount: 20,
      text: "Reply comment text",
    };

    await expect(
      commentService.addReply("non_existing_parent_id", replyData)
    ).rejects.toThrow("Parent comment not found");
  });
});

describe("getReplies", () => {
  test("should get replies for an existing comment", async () => {
    const parentComment = await Comment.create({
      id: "parent_comment_id",
      channelId: "parent_channel_id",
      videoId: "parent_video_id",
      author: "@parentuser",
      likeCount: 100,
      text: "Parent comment text",
    });

    const replyData: CommentData = {
      id: "reply_comment_id",
      parentId: parentComment.id,
      channelId: "reply_channel_id",
      videoId: "reply_video_id",
      author: "@replyuser",
      likeCount: 20,
      text: "Reply comment text",
    };

    await Comment.create(replyData);

    const replies = await commentService.getReplies(parentComment.id);
    expect(replies).not.toBeNull();
    expect(replies.length).toBe(1);
    expect(replies[0].id).toBe(replyData.id);
  });

  test("should throw an error if the parent comment does not exist", async () => {
    await expect(
      commentService.getReplies("non_existing_parent_id")
    ).rejects.toThrow("Parent comment not found");
  });
});

describe("saveCommentWithReplies", () => {
  it("should save a comment with replies", async () => {
    const commentData = createTestCommentData();

    expect(commentData.replies).toBeDefined();

    if (!commentData.replies) {
      throw new Error("Replies are undefined in the test data");
    }

    const savedComment = await commentService.saveCommentWithReplies(
      commentData
    );

    expect(savedComment).toBeDefined();
    expect(savedComment.id).toBeDefined();
    expect(savedComment.text).toEqual(commentData.text);

    const replies = await savedComment.getReplies();

    expect(replies).toHaveLength(commentData.replies.length);
    replies.forEach((reply, index) => {
      expect(reply).toBeDefined();
      expect(reply.text).toEqual(commentData.replies![index].text);
    });
  });
});
