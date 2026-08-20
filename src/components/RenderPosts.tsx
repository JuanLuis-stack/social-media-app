// RenderPosts.tsx

import { useState } from "react";
import type { Post } from "../Schemas/postSchema";
import PostCard from "./PostCard";
import CommentCard from "./CommentCard";
import SubmitterPostCard from "./SubmitterPostCard";
import { UsePostContext } from "../context/PostContext";

function RenderPosts() {
  const { posts, setPosts } = UsePostContext();

  const [seletedPost, setSeletedPost] = useState<Post | null>(null);

  return (
    <div className="flex-1 w-fit mt-13 md:mt-2 overflow-y-auto h-full custom-scrollbar md:rounded-t-3xl md:border border-white/35">
      {seletedPost && (
        <CommentCard
          post={seletedPost}
          setPosts={setPosts}
          onCloseComments={() => setSeletedPost(null)}
        />
      )}
      <ul className="h-full">
        {!posts ? (
          <div className="w-full h-1/2 flex justify-center items-center">
            <p className="font-semibold">There are not posts sended...</p>
          </div>
        ) : (
          <>
            <SubmitterPostCard />
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                setSeletedPost={setSeletedPost}
              />
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

export default RenderPosts;
