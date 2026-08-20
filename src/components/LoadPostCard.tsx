import type React from "react";
import Overlay from "./Overlay";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { postRetrivedSchema, type SubmitPostType } from "../Schemas/postSchema";
import { submitPost } from "../services/postsService";
import { UseAnimation } from "../context/AnimationContext";
import { UsePostContext } from "../context/PostContext";
import { UseSubmitterPost } from "../context/SubmitPostContext";

type PreviewMedia = {
  URL: string | null;
  size: string | null;
  name: string | null;
  type: string | null;
};

const textareaStyle =
  "max-h-45 w-full bg-gray-500/10 rounded-md overflow-y-auto resize-none custom-scrollbar focus:outline-none p-1 placeholder:text-sm";

function LoadPostCard() {
  const { isSubmitPostOpen, closeSubmitPost } = UseSubmitterPost();

  const { loggedUser } = useAuth();
  const { animate, activeAnimation } = UseAnimation();
  const { loadPosts } = UsePostContext();

  const [post, setPost] = useState<SubmitPostType>({
    title: "",
    content: "",
    media: null,
  });

  const [previewMedia, setPreviewMedia] = useState<PreviewMedia>({
    URL: null,
    size: null,
    name: null,
    type: null,
  });

  const [error, setError] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  function autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    autoResize(event.currentTarget);
    handleChange(event);
  }
  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    autoResize(event.currentTarget);
    handleChange(event);
  }

  function handlePreviewMedia(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.files) return;

    const file = event.currentTarget.files[0];

    if (previewMedia.URL) {
      URL.revokeObjectURL(previewMedia.URL);
    }

    const preview = URL.createObjectURL(file);

    setPost((prev) => ({
      ...prev,
      media: file,
    }));

    setPreviewMedia({
      URL: preview,
      size: (file.size / 1024 / 1024).toFixed(2),
      name: file.name,
      type: file.type,
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPost((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(
    event:
      | React.ChangeEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    const { title, content } = post;

    if (!title || !content) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const token = loggedUser?.token;

    if (!token) return;

    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("content", post.content);
    if (post.media) {
      formData.append("media", post.media);
    }

    const response = await submitPost(token, formData);
    postRetrivedSchema.parse(response);

    loadPosts();

    closePreview();
    closeSubmitPost();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  function closePreview() {
    if (!inputFileRef.current) return;
    URL.revokeObjectURL(previewMedia.URL);

    setPreviewMedia({
      URL: null,
      size: null,
      name: null,
      type: null,
    });

    setPost((prev) => ({
      ...prev,
      media: null,
    }));

    inputFileRef.current.value = "";
  }
  if (!isSubmitPostOpen) return null;

  return (
    <Overlay closerFunction={closeSubmitPost}>
      <div className="flex w-full h-full flex-col px-5 py-2 md:p-0 bg-[#101010] z-10 md:w-2/4 md:max-h-[85%] md:h-auto md:border border-white/30 md:rounded-2xl md:bg-black/2 md:backdrop-blur-xl animate-[fadeIn_500ms_ease-out]">
        <header className="flex justify-center relative md:border-b border-white/30 p-2 text-white pb-5">
          <button
            onClick={closeSubmitPost}
            className="absolute left-2 font-semibold cursor-pointer text-gray-400 hover:text-white rounded-md duration-150"
          >
            Cancelar
          </button>
          <p className="font-bold">Nuevo Post</p>
        </header>
        <div className="relative flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-1 p-2">
            <img
              src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
              alt=""
              className="h-7 mr-2.5 items-bottom"
            />
            <p>{loggedUser?.user.email}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-between px-2 py-2">
              <label htmlFor="title" className="w-20 pb-2 md:pr-2">
                Titulo:
              </label>
              <textarea
                ref={titleRef}
                name="title"
                id="title"
                rows={1}
                maxLength={120}
                onChange={handleTitleChange}
                onKeyDown={handleKeyDown}
                placeholder="¿Como lo llamaremos?"
                className={textareaStyle}
              ></textarea>
            </div>
            <div className="flex flex-col md:flex-row justify-between px-2">
              <label htmlFor="content" className="w-20 pb-2 md:pr-1">
                contexto:
              </label>
              <textarea
                ref={contentRef}
                name="content"
                id="content"
                maxLength={300}
                onChange={handleContentChange}
                onKeyDown={handleKeyDown}
                className={textareaStyle}
                placeholder="¿De que hablaremos hoy?"
              ></textarea>
            </div>
          </form>
          <input
            ref={inputFileRef}
            onChange={handlePreviewMedia}
            className="hidden"
            type="file"
          />
          <div className="flex justify-end mr-2 ">
            <svg
              id="imgIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              className={`cursor-pointer ${animate === "imgIcon" && "animate-[spanIn_400ms_ease]"}`}
              onClick={() => {
                activeAnimation("imgIcon");
                inputFileRef.current?.click();
              }}
            >
              <path d="M21 14V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9v-2H5v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V14h2Zm-4.29-5.71a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14v5.59L16.73 8.3Z"></path>
              <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M21 16h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
            </svg>
          </div>
          {previewMedia.URL && (
            <div className="p-2 relative w-fit">
              <div className="absolute top-2 left-2 p-1 backdrop-blur-2xl bg-black/30 rounded-br-2xl rounded-tl-2xl opacity-20 hover:opacity-100 duration-200">
                <p className="text-sm">{previewMedia.name}</p>
                <p className="text-sm">{previewMedia.size}</p>
              </div>
              <button
                id="ClosePreviewBtn"
                onClick={closePreview}
                className={`absolute bg-black/50 rounded-full p-0.5  z-10 cursor-pointer top-4 right-4`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                </svg>
              </button>
              {previewMedia.type?.startsWith("image") ? (
                <img
                  className="max-h-80 rounded-2xl"
                  src={previewMedia.URL}
                  alt=""
                />
              ) : (
                <video
                  muted
                  controls
                  autoPlay
                  loop
                  className="max-h-80 rounded-2xl"
                  src={previewMedia.URL}
                ></video>
              )}
            </div>
          )}
        </div>

        <footer className="flex justify-between p-2 h-13 w-full">
          <p
            className={`font-semiold ${error ? "text-red-500" : "text-transparent"} duration-500`}
          >
            Debes de llenar todos campos
          </p>
          <button
            id={"submitPost"}
            onClick={(e) => {
              handleSubmit(e);
              activeAnimation("submitPost");
            }}
            className={`bg-[#777] hover:bg-[#eee] md:hover:bg text-black/60 md:bg-black/10 md:hover:bg-black/30 md:text-white md:border-[1.5px] md:border-white/25 cursor-pointer duration-150 rounded-2xl px-2 p-1 
            ${animate === "submitPost" && "animate-[spanIn_400ms_ease]"}`}
          >
            Publicar
          </button>
        </footer>
      </div>
    </Overlay>
  );
}

export default LoadPostCard;
