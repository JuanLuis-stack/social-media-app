// Navbar.tsx

import { UsePostContext } from "../context/PostContext";
import NavbarLink from "./NavbarLink";

type Route = {
  path: string;
  name: string;
  url: string;
};

const routes: Route[] = [
  {
    path: "/",
    name: "Home",
    url: "M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62.16-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Z",
  },
  {
    path: "special",
    name: "Nuevo Post",
    url: "M11 17v4h2v-8h8v-2h-8V3h-2v8H3v2h8z",
  },
  {
    path: "/profile",
    name: "Profile",
    url: "M12 2a5 5 0 1 0 0 10 5 5 0 1 0 0-10M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1",
  },
];

function Navbar() {
  const { loadPosts } = UsePostContext();

  return (
    <nav className="group flex items-center h-13 w-screen fixed bottom-0 py-5 px-3 gap-10 md:flex-col md:h-screen md:w-15 md:max-xl:hover:w-50 xl:w-60 xl:relative xl:bg-white/1 backdrop-blur-2xl z-10 duration-300 select-none">
      <header className="flex justify-center flex-col items-center relative cursor-pointer">
        <h1
          onClick={loadPosts}
          className="hidden md:flex font-bold italic text-center"
        >
          P <p className="hidden md:max-xl:group-hover:block xl:block">osts</p>
        </h1>
        <h3 className="hidden md:max-xl:group-hover:block xl:block italic">
          Management
        </h3>
      </header>

      <div className="flex flex-row justify-around md:w-full md:flex-col md:justify-start flex-1 gap-1">
        {routes.map((route) => (
          <NavbarLink
            key={route.path}
            to={route.path}
            url={route.url}
            name={route.name}
          >
            {route.name}
          </NavbarLink>
        ))}
      </div>
      <NavbarLink
        to="/settings"
        name={"settings"}
        url={
          "m21.16 7.86-1-1.73a1.997 1.997 0 0 0-2.73-.73l-.53.31c-.58-.46-1.22-.83-1.9-1.11V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v.6c-.67.28-1.31.66-1.9 1.11l-.53-.31c-.96-.55-2.18-.22-2.73.73l-1 1.73c-.55.96-.22 2.18.73 2.73l.5.29c-.05.37-.08.74-.08 1.11s.03.74.08 1.11l-.5.29c-.96.55-1.28 1.78-.73 2.73l1 1.73c.55.95 1.78 1.28 2.73.73l.53-.31c.58.46 1.22.83 1.9 1.11v.6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-.6a8.7 8.7 0 0 0 1.9-1.11l.53.31c.96.55 2.18.22 2.73-.73l1-1.73c.55-.96.22-2.18-.73-2.73l-.5-.29c.05-.37.08-.74.08-1.11s-.03-.74-.08-1.11l.5-.29c.96-.55 1.28-1.78.73-2.73M12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4"
        }
      >
        Settings
      </NavbarLink>
    </nav>
  );
}

export default Navbar;
