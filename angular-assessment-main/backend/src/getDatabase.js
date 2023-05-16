import { connect } from "json-file-database";

const db = connect({
  file: "database.json",
});

export const videos = db({
  name: "videos",
  primaryKey: "id",
});

export const bookmarks = db({
  name: "bookmarks",
  primaryKey: "videoId",
});

export const users = db({
  name: "users",
  primaryKey: "username",
});

export default db;
