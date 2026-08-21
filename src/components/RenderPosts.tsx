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
    <div className="flex-1 mt-13 md:mt-2 overflow-y-auto h-full w-full custom-scrollbar md:rounded-t-3xl md:border border-white/35">
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
    </div>
  );
}

export default RenderPosts;
