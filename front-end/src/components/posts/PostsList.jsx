import PostItem from "./PostItem";

const PostsList = ({ posts, username, userId }) => {
  // if (posts.length === 0)
  //   return (
  //     <div className="border-r text-zinc-500 text-sm lg:pr-8 pr-4 flex-[3] min-h-[calc(100vh-171px)] flex justify-center items-center">
  //       No posts provided yet!
  //     </div>
  //   );
  return (
    <div className="lg:border-r lg:pr-8 pr-4 flex-[3] min-h-[calc(100vh-55px)] flex gap-y-2  flex-col">
      <div className="text-gray-400">
        <h2 className="py-4 border-b font-bold text-zinc-600 mb-4 lg:mb-0">
          Latest Posts
        </h2>
      </div>
      {posts?.length === 0 && (
        <div className="flex justify-center items-center h-full text-zinc-500 text-sm">
          No posts provided yet!
        </div>
      )}
      {posts?.map((item) => (
        <PostItem
          post={item}
          key={item._id}
          username={username}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default PostsList;
