import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { RenderPostType } from "../Schemas/postSchema";
import setTimeAgo from "../utils/setTimeAgo";
import SubmitterComment from "./SubmitterComment";
import { renderCommentsSchema, type Comment } from "../Schemas/commentSchema";
import { getComments } from "../services/postsService";
import RenderComments from "./RenderComments";
import Overlay from "./Overlay";
import ImagePlayer from "./ImagePlayer";
import VideoPlayer from "./VideoPlayer";

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
        <div className="bg-[#101010] md:bg-transparent w-screen h-[92%] md:w-2/3 md:h-2/3 md:backdrop-blur-md absolute md:relative top-0 z-10 md:border md:border-white/30 md:rounded-3xl overflow-hidden flex flex-col animate-[fadeIn_500ms_ease-out]">
          <header className="flex justify-around p-3 md:border-b h-11 relative backdrop-blur-2xl md:bg-black/45">
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

            {post.media_type && post.media_url && (
              <div>
                {post.media_type.startsWith("image") ? (
                  <ImagePlayer post={post} />
                ) : (
                  <VideoPlayer
                    videoUrl={post.media_url}
                    videoType={post.media_type}
                  ></VideoPlayer>
                )}
              </div>
            )}
            {/* HERE IS WHERE THE IMAGE HAVE TO BE*/}
            <ul className="mb-20">
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
