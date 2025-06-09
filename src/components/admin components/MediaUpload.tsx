import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  // sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Media {
  url: string;
  public_id: string;
  type: string;
}

interface MediaUploaderProps {
  media?: Media[];
  onChange: (media: Media[]) => void;
}

const SortableMedia = ({
  item,
  onRemove,
}: {
  item: Media;
  onRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="relative rounded overflow-hidden group"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {item.type === "image" ? (
        <img src={item.url} className="w-full h-24 object-cover rounded" />
      ) : item.type === "video" ? (
        <video
          src={item.url}
          controls
          className="w-full h-24 object-cover rounded"
        />
      ) : (
        <iframe
          src={item.url.replace("watch?v=", "embed/")}
          className="w-full h-24 rounded"
          allowFullScreen
        />
      )}
      <button
        onClick={onRemove}
        type="button"
        className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded"
      >
        <AiOutlineClose size={14} />
      </button>
    </div>
  );
};

const MediaUploader: React.FC<MediaUploaderProps> = ({ onChange, media }) => {
  const [medias, setMedias] = useState<Media[]>(media ? media : []);
  const [ytUrl, setYtUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (media) {
      setMedias(media);
    }
  }, [media]);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const uploads = Array.from(files).map(async (file) => {
      const fileType = file.type.startsWith("video") ? "video" : "image";
      const timestamp = Math.floor(Date.now() / 1000);
      const folder = "products";

      const sigRes = await axios.post("/api/cloudinary_upload", {
        paramsToSign: { timestamp, folder },
      });

      const sign = sigRes.data.signature;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", sign);
      formData.append("folder", folder);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) throw new Error("Missing Cloudinary cloud name");

      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`;
      const res = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { secure_url, public_id } = res.data;
      console.log(res.data);

      return {
        url: secure_url,
        public_id,
        type: fileType,
      };
    });
    try {
      const uploaded = await Promise.all(uploads);
      const updated = [...medias, ...uploaded];
      setMedias(updated);
      onChange(updated);
    } finally {
      setUploading(false);
    }
  };

  const handleYT = () => {
    if (ytUrl) {
      try {
        const videoId = new URL(ytUrl).searchParams.get("v");
        if (!videoId) {
          alert("Invalid Youtube URL");
          return;
        }

        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        const newMedia = {
          url: embedUrl,
          public_id: "",
          type: "youtube",
        };
        const updated = [...medias, newMedia];
        setMedias(updated);
        onChange(updated);
        setYtUrl("");
      } catch (err) {
        console.error(err);
        alert("Invalid Youtube URL");
      }
    }
  };

  const handleDelete = async (item: Media) => {
    if (item.public_id) {
      try {
        await axios.delete("/api/cloudinary_upload", {
          data: {
            public_id: item.public_id,
          },
        });
      } catch (err) {
        console.error("Deleting failed : ", err);
      }
    }
    onChange(medias.filter((m) => m !== item));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = medias.findIndex((item) => item.url === active.id);
    const newIndex = medias.findIndex((item) => item.url === over.id);

    const sorted = arrayMove(medias, oldIndex, newIndex);
    onChange(sorted);
  };
  // if (medias) {
  //   console.log(medias);
  //   console.log(media);
  // }
  return (
    <div className="space-y-4">
      <label className="w-24 h-24 border border-dashed border-gray-400 rounded-md cursor-pointer text-center flex flex-col items-center justify-center hover:bg-gray-100 transition relative">
        <div className="text-xs text-gray-600 px-1">Add image or video</div>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>

      <div className=" gap-2 flex">
        <input
          type="url"
          placeholder="Youtube link (optional)"
          value={ytUrl}
          onChange={(e) => setYtUrl(e.target.value)}
          className="flex-1 px-2 py-1 border rounded"
        />
        <button
          type="button"
          onClick={handleYT}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {uploading && <div className="text-sm text-gray-500">Uploading...</div>}

      {/* <div className="grid grid-cols-3 gap-2 mt-2 h-full">
        {medias?.map((m, i) => (
          <div className="relative group border " key={i}>
            {m.type === "image" && (
              <img src={m.url} alt="" className="w-full h-32 object-contain" />
            )}
            {m.type === "video" && (
              <video controls className="w-full h-32 object-cover">
                <source src={m.url} />
              </video>
            )}
            {m.type === "youtube" && (
              <iframe
                src={m.url}
                // src={m.url.replace("watch?v=", "embed/")}
                className="w-full h-32"
                title="youtube video"
                allowFullScreen
              ></iframe>
            )}
            <button
              onClick={() => handleDelete(m)}
              className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
            >
              X
            </button>
          </div>
        ))}
      </div> */}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={medias.map((m) => m.url)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-3 gap-3">
            {medias.map((m) => (
              <SortableMedia
                key={m.url}
                item={m}
                onRemove={() => handleDelete(m)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default MediaUploader;
