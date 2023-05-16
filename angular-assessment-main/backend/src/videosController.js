import { v4 as uuid } from "uuid";
import { videos, bookmarks } from "./getDatabase.js";

export const getVideos = async (_, res) => {
  res.send({ videos: Array.from(videos) });
};

export const putVideo = (req, res) => {
  const { video } = req.body;
  const videoToPush = {
    id: uuid(),
    url: video.url,
    name: video.name,
  };
  videos.insert(videoToPush);

  return res.status(200).json({
    videoId: videoToPush.id,
  });
};

export const bookmarkVideo = (req, res) => {
  const { videoId } = req.params;
  const { timestamp } = req.body;

  const video = videos.find({ id: videoId });

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  bookmarks.insert({
    videoId,
    timestamp,
  });
  return res.status(201).json({ message: "Bookmarked succesfully" });
};

export const getBookmarksForVideo = (req, res) => {
  const { videoId } = req.params;

  return res.status(200).json({
    bookmarks: bookmarks.findAll((b) => b.videoId === videoId),
  });
};
