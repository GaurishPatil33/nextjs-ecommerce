import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import { isDragging } from "framer-motion";
import {
  Upload,
  Image,
  Video,
  GripVertical,
  Play,
  X,
  Youtube,
  Trash,
  Trash2,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface Media {
  url: string;
  public_id: string;
  type?: string;
}

interface MediaUploaderProps {
  media?: Media[];
  types?: string[];
  onChange: (media: Media[]) => void;
}

const SortableMedia = ({
  item,
  onRemove,
}: {
  item: Media;
  onRemove?: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group bg-white rounded-lg border-2 hover:cursor-grab transition-all duration-200 hover:shadow-lg border-gray-200 ${
        isDragging ? "z-50" : ""
      }`}
    >
      {/* Delete Button */}
      {/* <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRemove();
        }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600  text-white rounded-full p-2 z-10"
        title="Remove media"
        style={{ pointerEvents: "auto" }}
      >
        <Trash2 size={12} />
      </button> */}

      {/* Media Content */}
      <div className="aspect-square overflow-hidden rounded-lg">
        {item.type === "image" && (
          <img
            src={item.url}
            alt={item.type || "Uploaded image"}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        )}

        {item.type === "video" && (
          <div className="relative flex">
            <video
              src={item.url}
              className="w-full h-full object-contain"
              preload="metadata"
              controls
            />
          </div>
        )}

        {item.type === "youtube" && (
          <div className="relative bg-gray-100">
            <iframe
              src={item.url}
              className="w-full h-full"
              allowFullScreen
              title={item.public_id}
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Type Badge */}
      <div className="absolute bottom-2 left-2">
        <div className="bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          {item.type === "image" && <Image size={10} />}
          {item.type === "video" && <Video size={10} />}
          {item.type === "youtube" && <Youtube size={10} />}
          {item.type?.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onChange,
  media,
  types = [],
}) => {
  const [medias, setMedias] = useState<Media[]>(media ? media : []);
  const [ytUrl, setYtUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (media) {
      setMedias(media);
    }
  }, [media]);

  const handleMediaUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [medias, onChange]
  );

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
          public_id: videoId,
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

  const handleDelete = useCallback(
    async (item: Media) => {
      console.log("Deleting item:", item);

      // Delete from Cloudinary if it's not a YouTube video
      if (item.public_id && item.type !== "youtube") {
        try {
          await axios.delete("/api/cloudinary_upload", {
            data: {
              public_id: item.public_id,
            },
          });
          console.log("Successfully deleted from Cloudinary:", item.public_id);
        } catch (err) {
          console.error("Deleting from Cloudinary failed:", err);
          // Continue with local deletion even if Cloudinary deletion fails
        }
      }

      // Update local state
      const updated = medias.filter((m) => m.url !== item.url);
      console.log("Updated media array:", updated);
      setMedias(updated);
      onChange(updated);
    },
    [medias, onChange]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = medias.findIndex((item) => item.url === active.id);
    const newIndex = medias.findIndex((item) => item.url === over.id);

    const sorted = arrayMove(medias, oldIndex, newIndex);
    setMedias(sorted);
    onChange(sorted);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        // Create a synthetic event to reuse existing upload logic
        const syntheticEvent = {
          target: { files: files },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleMediaUpload(syntheticEvent);
      }
    },
    [handleMediaUpload]
  );

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${
            dragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }
          ${uploading ? "opacity-50 pointer-events-none" : "cursor-pointer"}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={types.includes("video") ? "image/*,video/*" : "image/*"}
          multiple
          onChange={handleMediaUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={uploading}
        />

        <div className="flex flex-col items-center space-y-3">
          <div
            className={`
              w-16 h-16 rounded-full flex items-center justify-center transition-colors
              ${dragOver ? "bg-blue-100" : "bg-gray-100"}
            `}
          >
            <Upload
              size={24}
              className={dragOver ? "text-blue-600" : "text-gray-500"}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {uploading ? "Uploading..." : "Upload media files"}
            </h3>
            <p className="text-sm text-gray-500">
              Drag and drop images {types.includes("video") ? "or videos " : ""}
              here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supports JPG, PNG, GIF
              {types.includes("video") ? ", MP4, MOV" : ""}
            </p>
          </div>
        </div>

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Processing files...</span>
            </div>
          </div>
        )}
      </div>

      {types.includes("video") && (
        <div className="gap-2 flex">
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
      )}

      {uploading && <div className="text-sm text-gray-500">Uploading...</div>}

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
              <div className=" relative group" key={m.public_id}>
                <SortableMedia
                  key={m.url}
                  item={m}
                  // onRemove={() => handleDelete(m)}
                />
                <button
                  onClick={() => handleDelete(m)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600  text-white rounded-full p-2 z-50"
                  title="Remove media"
                  style={{ pointerEvents: "auto" }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {medias.length === 0 && !uploading && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Image size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No media uploaded yet</p>
          <p className="text-gray-400 text-sm">
            Start by uploading some images
            {types.includes("video") ? " or videos" : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
