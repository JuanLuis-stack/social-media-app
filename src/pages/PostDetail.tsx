import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../Schemas/postSchema";
import { UsePostContext } from "../context/PostContext";
import ScrollerContainer from "../components/ScrollerContainer";
import PostCard from "../components/PostCard";
import Spinner from "../components/Spinner";
import SubmitterComment from "../components/SubmitterComment";
import type { Comments } from "../Schemas/commentSchema";
import RenderComments from "../components/RenderComments";

function PostDetail() {
  const { getPostById, getCommentsByUserId } = UsePostContext();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comments | null>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function retrievedPost() {
      if (!postId) return;
      setLoading(true);

      const postResponse = await getPostById(postId);
      if (!postResponse) return;

      setPost(postResponse);
      setLoading(false);

      const commentResponse = await getCommentsByUserId(postResponse.id);
      setComments(commentResponse);
    }
    retrievedPost();
  }, [postId]);

  return (
    <div className="h-screen w-full">
      <div className="h-[13%] flex items-center pl-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="cursor-pointer"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
        >
          <path d="M9 13h7v-2H9V7l-6 5 6 5z"></path>
          <path d="M19 3h-7v2h7v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"></path>
        </svg>
        <p className="font-semibold text-xl text-white pl-3">Publicacion</p>
      </div>
      <div className="h-[87%] md:w-xl">
        {/* Pending to remake as a column component */}
        <ScrollerContainer>
          {!post || loading || !comments ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <PostCard post={post} onUpdatedPost={setPost}></PostCard>
              <SubmitterComment
                post={post}
                reloadComments={async () => {
                  const updatedComments = await getCommentsByUserId(post.id);

                  setComments(updatedComments);
                  setPost((currentPost) =>
                    !currentPost
                      ? null
                      : {
                          ...currentPost,
                          comments: String(updatedComments?.length),
                        },
                  );
                }}
              />
              <div
                className={`text-center pb-15 md:pb-0 ${comments.length < 1 && `w-full h-60 flex items-center justify-center`}`}
              >
                <RenderComments comments={comments}></RenderComments>
              </div>
            </>
          )}
        </ScrollerContainer>
      </div>
    </div>
  );
}

export default PostDetail;
