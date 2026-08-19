import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { RenderPostType } from "../Schemas/postSchema";
import setTimeAgo from "../utils/setTimeAgo";
import SubmitterComment from "./SubmitterComment";
import { renderCommentsSchema, type Comment } from "../Schemas/commentSchema";
import { getComments } from "../services/postsService";
import RenderComments from "./RenderComments";
import Overlay from "./Overlay";

type CommentCardProps = RenderPostType & {
  onCloseComments: () => void;
};

function CommentCard({ post, setPosts, onCloseComments }: CommentCardProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { loggedUser } = useAuth();

  async function commentsGetter() {
    if (!loggedUser?.token) return;

    const response = await getComments(loggedUser.token, post.id);
    const data = renderCommentsSchema.parse(response);

    if (!data) {
      setComments([]);
      return;
    }
    setComments(data.comment);

    setPosts((prev) =>
      !prev
        ? null
        : prev.map((currentPost) =>
            currentPost.id === post.id
              ? {
                  ...currentPost,
                  comments: String(data.comment.length),
                }
              : currentPost,
          ),
    );
  }

  useEffect(() => {
    commentsGetter();
  }, [post.id]);

  return (
    <Overlay closerFunction={onCloseComments}>
      {
        <div className="w-2/3 h-2/3 backdrop-blur-xs border relative z-10 rounded-2xl flex flex-col animate-[fadeIn_500ms_ease-out]">
          <header className="flex justify-around p-3 border-b h-11 relative bg-black/45">
            <button
              onClick={onCloseComments}
              className="absolute left-3 cursor-pointer hover:opacity-55 duration-300"
            >
              Cancelar
            </button>
            <h2>{post.name}</h2>
          </header>
          <div className="p-3 overflow-y-auto custom-scrollbar items-center">
            <div className="flex">
              <img
                src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
                alt=""
                className="h-7 pr-3"
              />
              <p>{loggedUser?.user.email}</p>
              <p className="pl-2">{setTimeAgo(post.created_at)}</p>
            </div>
            <div className="py-4">
              <h2 className="font-semibold text-md text-white">{post.title}</h2>
              <p className="font-light">{post.content}</p>
            </div>
            {/* HERE IS WHERE THE IMAGE HAVE TO BE*/}
            <ul className="mb-15">
              <li className="font-bold">Comentarios:</li>
              <RenderComments comments={comments} />
            </ul>
          </div>
          <footer className="absolute bottom-0 w-full">
            <SubmitterComment post={post} reloadComments={commentsGetter} />
          </footer>
        </div>
      }
    </Overlay>
  );
}

export default CommentCard;
