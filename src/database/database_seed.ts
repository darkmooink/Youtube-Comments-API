import { Comment } from "../models/comment";

export const populateDummyData = async () => {
  // Populate environment with some dummy data in dev
  console.log("🍼 Populating database with dummy data");
  await Comment.sync({ force: true });
  await Comment.create({
    id: "UgzH8vliQSJKHQMGZjx4AaABAg",
    channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
    videoId: "0e3GPea1Tyg",
    author: "@MrBeast",
    likeCount: 1012838,
    text: "Like I said in the video, subscribe if you haven’t already and you could win $10,000!",
    type: "top-level",
  });
  await Comment.create({
    id: "UgzH8vliQSJKHQMGZjx4AaABAg.9V8_MXpsbSv9V8_NNseQDx",
    parentId: "UgzH8vliQSJKHQMGZjx4AaABAg",
    channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
    videoId: "0e3GPea1Tyg",
    author: "@shrek3578",
    likeCount: 22324,
    text: "shrek",
    type: "reply",
  });
  await Comment.create({
    id: "UgzH8vliQSJKHQMGZjx4AaABAg.9V8_MXpsbSv9V8_NOFPBTj",
    parentId: "UgzH8vliQSJKHQMGZjx4AaABAg.9V8_MXpsbSv9V8_NNseQDx",
    channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
    videoId: "0e3GPea1Tyg",
    author: "@streamingksivsalexwassabi4190",
    likeCount: 22324,
    text: "Who else loves Mrbeast?\n\n👇",
    type: "reply",
  });
  const commentCount = (await Comment.findAll()).length;
  console.log(
    `📚 ${commentCount} comment${commentCount !== 1 ? "s" : ""} added to table`
  );
};
