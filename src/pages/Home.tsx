//Home.tsx

import RenderPosts from "../components/RenderPosts";

function Home() {
  return (
    <div className="w-xl flex flex-col h-screen gap-5">
      <p className="h-fit text-xl pt-4 text-white font-semibold">Para ti</p>

      <RenderPosts></RenderPosts>
    </div>
  );
}

export default Home;
