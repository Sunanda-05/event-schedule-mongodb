import Feedback from "../models/feedback.model.js";

export const createFeedback = async (feedbackDetails) => {
  try {
    const newFeedback = await Feedback.create(feedbackDetails)
      .populate("userId", "name email")
      .populate("eventId");
    return newFeedback;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating feedback");
  }
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
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving feedback by event");
  }
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
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving feedback by user");
  }
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
  } catch (error) {
    console.log(error);
    throw new Error("Error updating feedback");
  }
};

export const markHelpful = async (feedbackId, userId) => {
  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) {
    throw new ApiError(404, "Feedback not found");
  }

  const hasMarked = feedback.helpful.users.includes(userId);

  if (hasMarked) {
    feedback.helpful.users.pull(userId);
    feedback.helpful.count = feedback.helpful.users.length;
  } else {
    feedback.helpful.users.push(userId);
    feedback.helpful.count = feedback.helpful.users.length;
  }

  await feedback.save();
  return feedback;
};