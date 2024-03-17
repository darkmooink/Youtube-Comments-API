import { Comment } from "../models/comment";
import { CommentData } from "../types/comment";

export const getComments = async () => {
  return Comment.findAll();
};

export const getComment = async (id: string) => {
  return Comment.findOne({
    where: { id },
  });
};

export const saveComment = async (commentData: CommentData) => {
  return Comment.create<Comment>(commentData);
};

export const updateComment = async (id: string, updates: Partial<Comment>) => {
  return Comment.update(updates, {
    where: {
      id,
    },
  });
};

export const deleteComment = async (id: string) => {
  return Comment.destroy({
    where: {
      id,
    },
  });
};
