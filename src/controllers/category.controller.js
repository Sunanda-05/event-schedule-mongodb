import * as CategoryServices from "../services/category.service.js";
import ApiError from "../utils/ApiError.js";

export const createCategory = async (req, res, next) => {
  try {
    const userRole = req.user.globalRole;
    if (userRole !== "admin") {
      throw new ApiError(401, "Unauthorized");
    }
    const { name, description, iconUrl, parentCategory, populariry } = req.body;

    const caregoryDetails = {
      name,
      description,
      iconUrl,
      parentCategory,
      populariry,
    };

    const newCategory = await CategoryServices.createCategory(caregoryDetails);

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryServices.getCategories();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const userRole = req.user.globalRole;
    if (userRole !== "admin") {
      throw new ApiError(401, "Unauthorized");
    }

    const categoryId = req.params.id;
    if (!categoryId) throw new ApiError(400, "No category Id");

    const updatedDetails = {};

    if ("name" in req.body) updatedDetails.name = req.body.name;
    if ("description" in req.body)
      updatedDetails.description = req.body.description;
    if ("iconUrl" in req.body) updatedDetails.iconUrl = req.body.iconUrl;
    if ("populariry" in req.body)
      updatedDetails.populariry = req.body.populariry;
    if ("parentCategory" in req.body)
      updatedDetails.parentCategory = req.body.parentCategory;

    const updatedCategory = await CategoryServices.updateCategory(
      categoryId,
      updatedDetails
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const userRole = req.user.globalRole;
    if (userRole !== "admin") {
      throw new ApiError(401, "Unauthorized");
    }

    const categoryId = req.params.id;
    if (!categoryId) throw new ApiError(400, "No category Id");
    const deletedCategory = await CategoryServices.deleteCategory();

    res.status(200).json(deletedCategory);
  } catch (error) {
    next(error);
  }
};
