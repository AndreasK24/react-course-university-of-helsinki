const Note = require("../models/note");
const User = require("../models/user");

const initialNotes = [
  {
    content: "React patterns",
    important: "false",
    user: "64e00616ee886544c7a93b09",
  },
  {
    content: "React patterns",
    important: "false",
    user: "64e00616ee886544c7a93b09",
  },
  {
    content: "Reactive",
    important: "true",
    user: "64e00616ee886544c7a93b09",
  },
  {
    content: "React",
    important: "false",
    user: "64e00616ee886544c7a93b09",
  },
  {
    content: "Reacting",
    important: "true",
    user: "64e00616ee886544c7a93b09",
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
