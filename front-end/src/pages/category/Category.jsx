import { useParams } from "react-router-dom";
import PostsList from "../../components/posts/PostsList";
import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { postsCategoryApiCall } from "../redux/apicalls/PostApiCall";
const Category = () => {
  const dispatch = useDispatch();
  const { postsCategory } = useSelector((state) => state.posts);
  const { category } = useParams();

  useEffect(() => {
    dispatch(postsCategoryApiCall(category));
  }, [category]);

  return (
    <section className="cateory-conatainer">
      <h1 className="text-2xl font-bold border-b pb-5 capitalize">
        {category} posts
      </h1>
      <PostsList posts={postsCategory} />
    </section>
  );
};

export default Category;
