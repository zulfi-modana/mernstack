import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";
import toast, { LoaderIcon } from "react-hot-toast";
import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error in fetching note");
        toast.error("failed to fetch the note");
      }
    };
    fetchNote();
  }, [id]);

  console.log({ note });

  const handleDelete = async() => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try{
await api.delete(`/notes/${id}`);
      toast.success("note deleted successfully");
      navigate("/");

    } catch(error){
      console.log("error in deleting note",error);
      toast.error("failed to delete the note");
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("please add a title and content");
      return;
    }
    setSaving(true);
    try{
      await api.put(`/notes/${id}`, note);
      toast.success("note updated successfully");
      navigate("/");
    }catch(error){
      console.log("error in updating note", error);
      toast.error("failed to update the note");
    }finally{
      setSaving(false);
    }

  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
           <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Notes
        </Link>
        <button onClick={handleDelete} className="btn btn-error btn-outline">
          <Trash2Icon className="h-5 w-5" />
          Delete Note
        </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
              <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={note?.title }
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                </div>

                  <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Some Content"
                    className="input input-bordered"
                    value={note?.content }
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>

                <div className="card-action justify-end">
                  <button className="btn btn-success" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving...": "Save Changes"}
                  </button>
                </div>
            </div>
        </div>
       
      </div>
    </div>
  );
};
export default NoteDetailPage;
