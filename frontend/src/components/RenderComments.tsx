import type { CommentsProp } from "../Schemas/commentSchema";
import setTimeAgo from "../utils/setTimeAgo";
import UserName from "./UserName";

function RenderComments({ comments }: CommentsProp) {
  return comments.length === 0 ? (
    <p className="m-0 text-center">
      There are not comments. Do you want to be the first!?
    </p>
  ) : (
    comments.map((comment) => (
      <li
        key={comment.id}
        className="w-full border-t border-[#333] my-2 flex p-3"
      >
        <div className="">
          <img
            src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
            alt=""
            className="h-9 min-w-7 rounded-full mr-4 items-bottom"
          />
        </div>
        <div>
          <div className="flex ">
            <UserName user_name={comment.author}></UserName>
            <p className="pl-2">{setTimeAgo(comment.created_at)}</p>
          </div>
          <div className="text-start">{comment.content}</div>
        </div>
      </li>
    ))
  );
}

export default RenderComments;
