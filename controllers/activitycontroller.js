const Activity = require("../models/activity");

exports.createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    let filter = {};
    if (fromDate && toDate) {
      filter.date = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }
    const activities = await Activity.find(filter);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const activities = await Activity.aggregate([
      {
        $group: {
          _id: "$category",
          totalImpact: { $sum: "$impact" },
          count: { $sum: 1 },
        },
      },
    ]);

    const warnings = activities
      .filter((activity) => activity.totalImpact > 100)
      .map((activity) => ({
        category: activity._id,
        message: `Warning: The total impact for ${activity._id} exceeds the safe limit.`,
        suggestion: `Consider reducing activities in the ${activity._id} category.`,
      }));

    res.json({ activities, warnings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
