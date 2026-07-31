import mongoose from "mongoose";

// 1 Create a schema for the note model
// 2 Define Model based on the schema

const noteSchema = mongoose.Schema(
 {
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }, 

 },

{timestamps: true} //createdAt & updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;