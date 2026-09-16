import NotificationsTypeMenu from "../components/NotificationsTypeMenu";
import RenderNotifications from "../components/RenderNotifications";
import ScrollerContainer from "../components/ScrollerContainer";

function Activity() {
  return (
    <div className="h-screen flex w-full justify-center xl:justify-start relative">
      <div className="md:flex justify-between items-center flex-col w-screen md:w-xl h-full md:pr-4 absolute bottom-0">
        <div className="flex w-full justify-between items-center h-[10%] pt-3 pl-2 max-md:pb-4">
          <div className="flex items-center justify-between w-full mr-5 relative">
            <p className="font-semibold text-start text-xl text-white cursor-pointer">
              Actividad
            </p>
            <NotificationsTypeMenu isPage={true}></NotificationsTypeMenu>
          </div>
        </div>
        <div className="h-[87%] w-full overflow-hidden rounded-t-3xl">
          <ScrollerContainer>
            <RenderNotifications></RenderNotifications>
          </ScrollerContainer>
        </div>
      </div>
    </div>
  );
}

export default Activity;
