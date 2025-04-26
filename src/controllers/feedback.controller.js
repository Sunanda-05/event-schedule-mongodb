import * as FeedbackServices from "../services/feedback.service.js";
import ApiError from "../utils/ApiError.js";

export const createFeedback = async (req, res, next) => {
  try {
    const feedbackDetails = {
      ...req.body,
      userId: req.user._id,
    };

    const newFeedback = await FeedbackServices.createFeedback(feedbackDetails);

    res.status(201).json(newFeedback);
  } catch (error) {
    next(error);
  }
};

export const getEventFeedback = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    if (!eventId) throw new ApiError(400, "Event ID is required");

    const feedbacks = await FeedbackServices.getEventFeedback(eventId);

    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

export const getUserFeedback = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const feedbacks = await FeedbackServices.getFeedbackByUserId(userId);

    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

export const updateFeedback = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;
    if (!feedbackId) throw new ApiError(400, "Feedback ID is required");

    const updatedFeedback = await FeedbackServices.updateFeedback(
      feedbackId,
      req.body
    );

    res.status(200).json(updatedFeedback);
  } catch (error) {
    next(error);
  }
};

export const markFeedbackHelpful = async (req, res, next) => {
  try {
    const feedbackId = req.params.id;
    const userId = req.user._id;

    const updated = await FeedbackServices.markHelpful(feedbackId, userId);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
