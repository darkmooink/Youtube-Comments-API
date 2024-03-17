export type CommentData = {
  id: string;
  parentId: string | null;
  channelId: string;
  videoId: string;
  author: string;
  likeCount: number;
  text: string;
};
