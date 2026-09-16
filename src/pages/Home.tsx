//Home.tsx

import RenderPosts from "../components/RenderPosts";
import SubmitterPostCard from "../components/SubmitterPostCard";
import { UsePostContext } from "../context/PostContext";
import ScrollerContainer from "../components/ScrollerContainer";
import RenderNotifications from "../components/RenderNotifications";
import { UseNotifications } from "../context/NotificationsContext";
import NotificationsTypeMenu from "../components/NotificationsTypeMenu";
import AddColumnMenu from "../components/AddColumnMenu";
import CloseNotificationMenu from "../components/CloseNotificationMenu";

function Home() {
  const { posts } = UsePostContext();
  const { isNotificationColumnVisible } = UseNotifications();

  return (
    <div className="flex flex-row w-full h-screen justify-start gap-4">
      <div className="h-full flex flex-col md:w-[65%] justify-between">
        <h1 className="text-xl italic font-bold text-white h-1 w-screen flex md:hidden z-9 justify-center backdrop-blur-2xl">
          P
        </h1>
        <div className="hidden md:flex items-center h-[10%] pt-3 pl-2">
          <p className="font-semibold text-xl text-white cursor-pointer">
            Para ti
          </p>
        </div>
        <div className={`h-[87%] w-full md:rounded-t-3xl overflow-hidden`}>
          <ScrollerContainer>
            <RenderPosts posts={posts}>
              <SubmitterPostCard />
            </RenderPosts>
          </ScrollerContainer>
        </div>
      </div>
      {isNotificationColumnVisible ? (
        <div className="hidden md:flex justify-between items-center flex-col w-[45%] md-xl:w-[40%] pr-4">
          <div className="hidden md:flex w-full justify-between items-center h-[10%] pt-3 pl-2">
            <div className="flex items-center relative">
              <p className="font-semibold text-start text-xl text-white cursor-pointer">
                Actividad
              </p>
              <NotificationsTypeMenu></NotificationsTypeMenu>
            </div>
            <CloseNotificationMenu></CloseNotificationMenu>
          </div>
          <div className="h-[87%] w-full overflow-hidden rounded-t-3xl">
            <ScrollerContainer>
              <RenderNotifications></RenderNotifications>
            </ScrollerContainer>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex h-full justify-center items-center">
          <AddColumnMenu></AddColumnMenu>
        </div>
      )}
    </div>
  );
}

export default Home;
