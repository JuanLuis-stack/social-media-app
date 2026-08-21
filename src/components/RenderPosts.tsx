// RenderPosts.tsx

import React, { useState } from "react";
import type { Post, Posts } from "../Schemas/postSchema";
import PostCard from "./PostCard";
import CommentCard from "./CommentCard";

type RenderPostsType = {
  posts: Posts | null;
  children?: React.ReactNode;
};

function RenderPosts({ posts, children }: RenderPostsType) {
  const [seletedPost, setSeletedPost] = useState<Post | null>(null);

  return (
    <>
      {seletedPost && (
        <CommentCard
          post={seletedPost}
          onCloseComments={() => setSeletedPost(null)}
        />
      )}
      <ul className="h-full w-full">
        {!posts ? (
          <div className="w-full h-1/2 flex justify-center items-center">
            <p className="font-semibold">There are not posts sended...</p>
          </div>
        ) : (
          <>
            {/* <SubmitterPostCard /> */}
            {children}
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
    </>
  );
}

export default RenderPosts;
