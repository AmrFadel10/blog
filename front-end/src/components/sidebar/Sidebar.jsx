// import "./sidebar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryApiCall } from "../../pages/redux/apicalls/categoryApiCall";
import { IoIosTrendingUp } from "react-icons/io";
import Moment from "react-moment";

const Sidebar = ({ posts }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategoryApiCall());
  }, []);
  return (
    <div className="flex-[1]  text-zinc-600 lg:pl-4 ">
      <h2 className="pt-4 lg:pb-2 border-b font-bold text-zinc-600 lg:mb-8 hidden lg:block">
        Categories
      </h2>
      <ul className="flex gap-1 lg:gap-3 lg:flex-wrap lg:mb-8 py-4 lg:p-0 w-full overflow-x-auto lg:overflow-hidden">
        {categories.map((category) => (
          <Link
            className="lg:py-2 py-1 lg:px-5 px-2 bg-zinc-200 hover:bg-zinc-300 transition text-xs lg:text-sm font-semibold rounded-full "
            key={category._id}
            to={`/posts/categories/${category.title}`}
          >
            {category.title}
          </Link>
        ))}
      </ul>
      <section className="first:border-b lg:flex flex-col gap-4 py-2 hidden ">
        <h2 className="flex gap-2 text-xl font-bold border-b pb-4 items-center text-zinc-500">
          Trending
          <IoIosTrendingUp size={20} />
        </h2>
        {posts?.map((post, index) => {
          return (
            <article key={index} className="flex gap-4 items-center ">
              <div className="xl:w-20 xl:h-20 lg:w-16 lg:h-16 rounded-lg flex justify-center font-bold items-center xl:text-6xl lg:text-4xl text-zinc-200">
                {`${index + 1}`.padStart(2, 0)}
              </div>
              <div className="flex-1">
                <div className="flex gap-2 items-center text-zinc-600 ">
                  <img
                    src={post?.user?.profilePhoto?.url}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <Link
                    className="hover:text-zinc-800 font-medium"
                    to={post?.id}
                  >
                    {post?.user.username}
                  </Link>{" "}
                  <div className="lg:text-sm text-xs font-semibold">
                    {
                      <Moment fromNow ago>
                        {post?.createdAt}
                      </Moment>
                    }{" "}
                    ago.
                  </div>
                </div>
                <h3 className="my-2 xl:text-2xl text-lg font-bold line-clamp-1">
                  {post.title}
                </h3>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Sidebar;
