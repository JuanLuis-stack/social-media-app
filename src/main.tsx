import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { AnimationProvider } from "./context/AnimationContext.tsx";
import { PostsProvider } from "./context/PostContext.tsx";
import { SubmitterPostProvider } from "./context/SubmitPostContext.tsx";
import { FollowProvider } from "./context/FollowContext.tsx";
import { NotificationProvider } from "./context/NotificationsContext.tsx";
import { ColumnNavigationProvider } from "./context/ColumnNavigationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PostsProvider>
        <AnimationProvider>
          <SubmitterPostProvider>
            <FollowProvider>
              <NotificationProvider>
                <ColumnNavigationProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </ColumnNavigationProvider>
              </NotificationProvider>
            </FollowProvider>
          </SubmitterPostProvider>
        </AnimationProvider>
      </PostsProvider>
    </AuthProvider>
  </StrictMode>,
);
