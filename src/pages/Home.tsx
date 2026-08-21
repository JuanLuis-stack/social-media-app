//Home.tsx

import RenderPosts from "../components/RenderPosts";
import SubmitterPostCard from "../components/SubmitterPostCard";
import { UsePostContext } from "../context/PostContext";

function Home() {
  const { posts } = UsePostContext();

  return (
    <div className="w-screen md:w-xl flex flex-col h-screen gap-2">
      <h1 className="text-xl italic font-bold text-white h-1 w-screen flex md:hidden z-9 justify-center backdrop-blur-2xl">
        P
      </h1>
      <p className="hidden md:block pt-3 pl-2 font-semibold text-xl text-white cursor-pointer">
        Para ti
      </p>
      <RenderPosts posts={posts}>
        <SubmitterPostCard />
      </RenderPosts>
    </div>
  );
}

export default Home;
