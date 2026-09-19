//Home.tsx

import RenderPosts from "../components/RenderPosts";
import SubmitterPostCard from "../components/SubmitterPostCard";
import { UsePostContext } from "../context/PostContext";
import ScrollerContainer from "../components/ScrollerContainer";
import RenderNotifications from "../components/RenderNotifications";
import { UseNotifications } from "../context/NotificationsContext";
import NotificationsTypeMenu from "../components/NotificationsTypeMenu";
import AddColumnMenu from "../components/AddColumnMenu";
import CloseNotificationColumn from "../components/CloseNotificationColumn";
import { Column } from "../context/ColumnContext";
import { UseColumnNavigation } from "../context/ColumnNavigationContext";
import GoBackArrow from "../components/GoBackArrow";
import ProfileColumn from "../components/ProfileColumn";
import PostDetailColumn from "../components/PostDetailColumn";

function Home() {
  const { posts } = UsePostContext();
  const { columns } = UseColumnNavigation();
  const { isNotificationColumnVisible } = UseNotifications();
  const shouldUseColumnNavigation = columns.length >= 2;

  const mainColumn = columns[0];
  const currentHistory = mainColumn?.history.at(-1);

  const secondColumn = columns[1];
  const secondHistory = secondColumn?.history.at(-1);

  return (
    <div className="flex flex-row w-screen md:w-full md:px-5 h-screen justify-center xl:justify-start gap-4">
      <Column id="for_you">
        <div
          className={`h-full w-full md:w-[55%] flex flex-col ${shouldUseColumnNavigation ? "md:w-[60%]" : "md:w-xl"} justify-between`}
        >
          <h1 className="text-xl italic font-bold text-white h-1 w-full flex md:hidden z-9 justify-center backdrop-blur-2xl">
            P
          </h1>
          <div className="hidden md:flex w-full justify-between items-center h-[10%] pt-3 pl-2">
            <div className="flex items-center relative">
              <div className="flex items-center h-[10%] pt-3 pl-2">
                {currentHistory ? (
                  <GoBackArrow
                    name={
                      currentHistory.type === "post"
                        ? "Publicacion"
                        : currentHistory.user_name
                    }
                  ></GoBackArrow>
                ) : (
                  <p className="font-semibold text-xl text-white cursor-pointer">
                    Para ti
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={`h-[87%] w-full md:rounded-t-3xl overflow-hidden`}>
            {!currentHistory ? (
              <ScrollerContainer>
                <RenderPosts posts={posts}>
                  <SubmitterPostCard />
                </RenderPosts>
              </ScrollerContainer>
            ) : currentHistory.type === "profile" ? (
              <ProfileColumn
                user_name={currentHistory.user_name}
              ></ProfileColumn>
            ) : currentHistory.type === "post" ? (
              <PostDetailColumn
                id={String(currentHistory.post_id)}
              ></PostDetailColumn>
            ) : null}
          </div>
        </div>
      </Column>
      {isNotificationColumnVisible ? (
        <Column id="activity">
          <div className="hidden md:w-[45%] md:flex justify-between items-center flex-col xl:w-md">
            <div className="flex w-full justify-between items-center h-[10%] pt-3 pl-2">
              <div className="flex items-center relative">
                {secondHistory ? (
                  <GoBackArrow
                    name={
                      secondHistory.type === "post"
                        ? "Publicacion"
                        : secondHistory.user_name
                    }
                  ></GoBackArrow>
                ) : (
                  <div className="hidden md:flex items-center h-[10%] pt-3 pl-2">
                    <p className="font-semibold text-xl text-white cursor-pointer">
                      Para ti
                    </p>
                    <NotificationsTypeMenu></NotificationsTypeMenu>
                  </div>
                )}
              </div>
              <CloseNotificationColumn></CloseNotificationColumn>
            </div>
            <div className="h-[87%] w-full md:rounded-t-3xl overflow-hidden">
              {!secondHistory ? (
                <ScrollerContainer>
                  <RenderNotifications></RenderNotifications>
                </ScrollerContainer>
              ) : secondHistory.type === "profile" ? (
                <ProfileColumn
                  user_name={secondHistory.user_name}
                ></ProfileColumn>
              ) : secondHistory.type === "post" ? (
                <PostDetailColumn
                  id={String(secondHistory.post_id)}
                ></PostDetailColumn>
              ) : null}
            </div>
          </div>
        </Column>
      ) : (
        <div className="hidden md:flex h-full justify-center items-center">
          <AddColumnMenu></AddColumnMenu>
        </div>
      )}
    </div>
  );
}

export default Home;
