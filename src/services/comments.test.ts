import { sequelize } from "../database/database";
import { Comment } from "../models/comment";
import { CommentData } from "../types/comment";
import * as commentService from "./comments";

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
