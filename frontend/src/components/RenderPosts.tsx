// RenderPosts.tsx

import type { Posts } from "../Schemas/postSchema";
import PostCard from "./PostCard";

type RenderPostsType = {
  posts: Posts | null;
  children?: React.ReactNode;
};

function RenderPosts({ posts, children }: RenderPostsType) {
  return (
    <>
      <ul className="h-full w-full">
        {!posts ? (
          <div className="w-full h-1/2 flex justify-center items-center">
            <p className="font-semibold">There are not posts sended...</p>
          </div>
        ) : (
          <>
            {children}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        )}
      </ul>
    </>
  );
}

export default RenderPosts;
