import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";

export const getCategoryById = async (id) => {
  try {
    const category = await Category.findById(id).lean();
    return category;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving category");
  }
};

export const getCategories = async () => {
  try {
    const categories = await Category.find().lean();
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving categories");
  }
};

export const createCategory = async (categoryDetails) => {
  try {
    if (categoryDetails.parentCategoryId) {
      const parent = await Category.findById(categoryDetails.parentCategoryId);
      if (!parent) throw new ApiError(400, "Invalid Parent Category Id");
    }

    const newCategory = await Category.create(categoryDetails).lean();
    return newCategory;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating category");
  }
};

export const updateCategory = async (categoryId, categoryDetails) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      categoryDetails,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) throw new ApiError(404, "Category not found");
    return updatedCategory;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating categories");
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) throw new ApiError(404, "Category not found");
    return deletedCategory;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting categories");
  }
};
