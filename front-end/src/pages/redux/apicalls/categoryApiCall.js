import request from "../../../utils/axios";
import { toast } from "react-toastify";
import { categoryactions } from "../slices/CategorySlice";

export const getCategoryApiCall = () => {
  return async (disptach) => {
    try {
      const { data } = await request.get(`/api/categories`);
      disptach(categoryactions.getCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

//delete category
export const deleteCategoryApiCall = (categoryId) => {
  return async (disptach, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      disptach(categoryactions.deletecategory(categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

//delete category
export const createCategoryApiCall = (newCategory) => {
  return async (disptach, getState) => {
    try {
      disptach(categoryactions.setLoading());
      const { data } = await request.post(`/api/categories/`, newCategory, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      disptach(categoryactions.createCategory(data));
      disptach(categoryactions.setIsCateCreated());
      toast.success("New Category was Added");
      setTimeout(() => disptach(categoryactions.clearIsCateCreated()), 1000);
    } catch (error) {
      toast.error(error.response.data.message);
      disptach(categoryactions.clearLoading());
    }
  };
};

export const categoryCountApiCall = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("api/categories/count", {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryactions.getCountCategories(data.category));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
