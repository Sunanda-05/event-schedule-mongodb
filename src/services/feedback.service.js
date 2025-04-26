import Feedback from "../models/feedback.model.js";

export const createFeedback = async (feedbackDetails) => {
  try {
    const newFeedback = await Feedback.create(feedbackDetails)
      .populate("userId", "name email")
      .populate("eventId");
    return newFeedback;
  } catch (error) {}
};

export const getEventFeedback = async (eventId) => {
  try {
    const feedbacks = await Feedback.find({
      eventId,
    })
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("eventId");

    return feedbacks;
  } catch (error) {}
};

export const getFeedbackByUserId = async (userId) => {
  try {
    const feedbacks = await Feedback.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("eventId");

    return feedbacks;
  } catch (error) {}
};

export const updateFeedback = async (feedbackId, feedbackDetails) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      feedbackDetails,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("userId", "name email")
      .populate("eventId", "title shortDescription");

    if (!updatedFeedback) throw new ApiError(404, "RSVP not found");
    return updatedFeedback;
  } catch (error) {}
};
