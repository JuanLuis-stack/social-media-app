import { useParams } from "react-router-dom";
import GoBackArrow from "../components/GoBackArrow";
import { Column } from "../context/ColumnContext";
import PostDetailColumn from "../components/PostDetailColumn";

function PostDetail() {
  const { postId } = useParams<{ postId: string }>();

  if (!postId) return null;

  return (
    <Column id="post_detail">
      <div className="w-full h-screen md:flex md:justify-center xl:justify-start">
        <div className="h-full md:w-xl md:flex md:justify-between md:flex-col">
          <GoBackArrow name="Publicacion"></GoBackArrow>
          <div className="h-[80%] md:h-[90%] overflow-hidden rounded-t-3xl">
            <PostDetailColumn id={postId}></PostDetailColumn>
          </div>
        </div>
      </div>
    </Column>
  );
}

export default PostDetail;
