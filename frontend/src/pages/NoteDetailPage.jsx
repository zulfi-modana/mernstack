import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import toast, { LoaderIcon } from "react-hot-toast";
import api from "../lib/axios";

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
      } catch (error) {
        console.log("error in fetching note");
        toast.error("failed to fetch the note");
      }
    };
    fetchNote();
  }, [id]);

  console.log({ note });

  if(loading){
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <LoaderIcon className="animate-spin size-10"/>

        </div>
    );
  }

  return <div className="min-h-screen bg-base-200">
<div className="container mx-auto px-4 py-8">
    
</div>
  </div>;
};
export default NoteDetailPage;
