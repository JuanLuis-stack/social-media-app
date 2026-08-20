import type { CommentsProp } from "../Schemas/commentSchema";
import setTimeAgo from "../utils/setTimeAgo";

function RenderComments({ comments }: CommentsProp) {
  return comments.length === 0 ? (
    <p className="m-0 text-center">
      There are not comments. Do you want to be the first!?
    </p>
  ) : (
    comments.map((comment) => (
      <li
        key={comment.id}
        className="border-b border-[#444] md:border-none md:bg-white/6 my-2 md:rounded-xl flex p-3 md:p-3"
      >
        <div className="w-10">
          <img
            src="https://marketplace.canva.com/N2Y1c/MAEbiyN2Y1c/1/tl/canva-user-profile-avatar-MAEbiyN2Y1c.png"
            alt=""
            className="h-7 min-w-7 rounded-full mr-0 items-bottom"
          />
        </div>
        <div>
          <div className="flex ">
            <p>{comment.author}</p>
            <p className="pl-2">{setTimeAgo(comment.created_at)}</p>
          </div>
          <div>{comment.content}</div>
        </div>
      </li>
    ))
  );
}

export default RenderComments;
