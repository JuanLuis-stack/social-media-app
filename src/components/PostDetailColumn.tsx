import { useEffect, useState } from "react";
import { UsePostContext } from "../context/PostContext";
import PostCard from "./PostCard";
import RenderComments from "./RenderComments";
import ScrollerContainer from "./ScrollerContainer";
import Spinner from "./Spinner";
import SubmitterComment from "./SubmitterComment";
import type { Post } from "../Schemas/postSchema";
import type { Comments } from "../Schemas/commentSchema";

function PostDetailColumn({ id }: { id: string }) {
  const { getPostById, getCommentsByUserId } = UsePostContext();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comments | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function retrievedPost() {
      setLoading(true);

      const postResponse = await getPostById(id);
      if (!postResponse) return;

      setPost(postResponse);
      setLoading(false);

      const commentResponse = await getCommentsByUserId(postResponse.id);
      setComments(commentResponse);
    }
    retrievedPost();
  }, [id]);

  return (
    <ScrollerContainer>
      {!post || loading || !comments ? (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full">
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
        </div>
      )}
    </ScrollerContainer>
  );
}

export default PostDetailColumn;
