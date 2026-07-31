import Note from "../model/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort notes by creation date in descending order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function getNoteById(req, res) {
  try {
    /* const {title,content} = req.body */
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (error) {
    console.error("Error in createNote", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function editNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json({ message: "note updated successfully", updatedNote });
  } catch (error) {
    console.error("Error in editNote", error);
    res.status(500).json({ message: "internal server error" });
  }
  /* res.status(200).json({message:"note updated succesfully"}) */
}

export async function deleteNote(req, res) {
  try {
    const { title } = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id, { title });
    if (!deletedNote) {
      return res.status(404).json({ message: "note does not exist" });
    }

    res
      .status(200)
      .json({
        message:
          "note deleted succesfully :" +
          deletedNote.title +
          " with id :" +
          deletedNote._id,
      });
  } catch (error) {
    console.error("Error in deleteNote", error);
    res.status(500).json({ message: "internal server error" });
  }
}
