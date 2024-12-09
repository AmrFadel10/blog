import { Link } from "react-router-dom";
import "./posts.css";
import Moment from "react-moment";
const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user._id}`;
  return (
    <div className="flex lg:gap-4  gap-3 sm:items-center  px-3 md:px-4 py-3 md:py-5 lg:py-6 lg:border-b border sm:flex-row flex-col-reverse rounded-xl shadow ">
      <div className="flex-[4]">
        <div className="flex gap-2 items-center text-zinc-600 ">
          <img
            src={post?.user?.profilePhoto?.url}
            alt="img"
            className="w-7 h-7 rounded-full"
          />
          <Link
            className="hover:text-zinc-800 font-medium capitalize"
            to={profileLink}
          >
            {username ? username : post?.user.username}
          </Link>
          <span className="text-zinc-600 font-medium">@</span>
          <div className="lg:text-sm text-xs font-semibold">
            {
              <Moment fromNow ago>
                {post?.createdAt}
              </Moment>
            }{" "}
            ago.
          </div>
        </div>
        <Link
          to={`/posts/details/${post.id}`}
          className="lg:text-2xl text-lg font-bold text-zinc-800 my-3 block line-clamp-1"
        >
          {post?.title}
        </Link>
        <p className="line-clamp-1 text-zinc-500 font-medium mb-4 ">
          {post?.description}
        </p>
        <Link
          className="lg:py-[2px] py-1 lg:px-5 px-3 bg-zinc-200 hover:bg-zinc-300 lg:text-sm text-xs font-semibold transition rounded-full "
          to={`/posts/categories/${post?.category}`}
        >
          {post?.category}
        </Link>
      </div>
      <div className="flex-[2] rounded-md overflow-hidden max-h-[220px]">
        <img
          src={post?.imagePost?.url}
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
};

export default PostItem;
