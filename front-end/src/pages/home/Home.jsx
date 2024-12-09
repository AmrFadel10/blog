import React, { useEffect, useState } from "react";
// import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import PostsList from "../../components/posts/PostsList";
import Sidebar from "../../components/sidebar/Sidebar";
import { postsApiCall, postsCountApiCall } from "../redux/apicalls/PostApiCall";
import Pagination from "../../components/pagination/Pagination";
const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, postsCount } = useSelector((state) => state.posts);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(postsApiCall(currentPage));
  }, [currentPage]);

  const POSTS_PER_PAGE = 5;

  const pageCount = Math.ceil(postsCount / POSTS_PER_PAGE);

  useEffect(() => {
    dispatch(postsApiCall(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(postsCountApiCall());
  }, []);

  return (
    <section className=" w-full container mx-auto bg-white p-2">
      <div className="flex xl:gap-4 gap-2 flex-col-reverse lg:flex-row">
        <PostsList posts={posts} />
        <Sidebar posts={posts} />
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        currentPage={currentPage}
      />
    </section>
  );
};

export default Home;
