import React, { useRef, useState } from "react";
import { submitComment } from "../services/postsService";
import type { Post } from "../Schemas/postSchema";
import { useAuth } from "../context/AuthContext";
import { UseAnimation } from "../context/AnimationContext";

type SubmitterCommentsProps = {
  post: Post;
  reloadComments: () => void;
};

type Message = {
  content: string;
};

function SubmitterComment({ post, reloadComments }: SubmitterCommentsProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<Message>({ content: "" });
  const { loggedUser } = useAuth();
  const { animate, activeAnimation } = UseAnimation();

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (event.currentTarget.value === "") {
      if (!textareaRef.current) return;
      textareaRef.current.style.height = "21px";
    }
    setMessage({
      content: event.target.value,
    });
  }

  function handleResize() {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!loggedUser) return;

    try {
      const token = loggedUser.token;
      await submitComment(token, post.id, message.content);

      reloadComments();

      setMessage({ content: "" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className="flex items-stretch w-full h-auto p-2">
      <div className="mr-3 flex items-end">
        <img
          src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
          alt=""
          className="h-7 mb-2.5 ml-2"
        />
      </div>
      <form
        className="w-svh h-auto flex flex-1 bg-black/45 rounded-xl p-3"
        onSubmit={handleSubmit}
      >
        <textarea
          ref={textareaRef}
          placeholder="Qué quieres comentar?"
          value={message.content}
          onChange={handleChange}
          onKeyDown={handleResize}
          rows={1}
          maxLength={300}
          className="focus:outline-none flex-1 resize-none max-h-21 custom-scrollbar"
        ></textarea>
        <div
          className="flex items-end"
          id="SubmitCommentIcon"
          onClick={() => activeAnimation("SubmitCommentIcon")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            className={`cursor-pointer relative ${animate === "SubmitCommentIcon" && "animate-[spanIn_400ms_ease]"}`}
          >
            <path d="M20.56 3.17c-.29-.2-.67-.23-.99-.08l-17 8.01c-.36.17-.58.53-.57.92 0 .39.24.75.6.9l3.36 1.47L16 8l-7 8v6l5.46-3.9 4.14 1.81c.13.06.26.08.4.08.18 0 .36-.05.52-.15a.99.99 0 0 0 .48-.79l1-15c.02-.35-.14-.69-.43-.89Z"></path>
          </svg>
        </div>
      </form>
    </article>
  );
}

export default SubmitterComment;
