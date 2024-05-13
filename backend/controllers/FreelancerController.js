const Freelancer = require("../models/freelancer");
const User = require("../models/user");

// Add a new freelancer
module.exports.addFreelancer = async (req, res) => {
    try {
        const { userId, portfolio, skills } = req.body;

        // Check if the user has the 'freelancer' role
        const user = await User.findById(userId);
        if (!user || !user.roles.includes('freelancer')) {
            return res.status(400).json({ message: "User is not a freelancer" });
        }

        // Check if the freelancer already exists
        const existingFreelancer = await Freelancer.findOne({ userId });
        if (existingFreelancer) {
            return res.status(400).json({ message: "Freelancer already exists" });
        }

        // Create a new freelancer
        const newFreelancer = new Freelancer({ userId, portfolio, skills });
        await newFreelancer.save();

        res.status(201).json({ message: "Freelancer added successfully", newFreelancer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get freelancer by userId
module.exports.getFreelancer = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user has the 'freelancer' role
        const user = await User.findById(userId);
        if (!user || !user.roles.includes('freelancer')) {
            return res.status(400).json({ message: "User is not a freelancer" });
        }

        const freelancer = await Freelancer.findOne({ userId }).populate('userId', 'firstName lastName email');
        if (!freelancer) {
            return res.status(404).json({ message: "Freelancer not found" });
        }

        res.status(200).json(freelancer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update freelancer by userId
module.exports.updateFreelancer = async (req, res) => {
    try {
        const { userId } = req.params;
        const { portfolio, skills } = req.body;

        // Check if the user has the 'freelancer' role
        const user = await User.findById(userId);
        if (!user || !user.roles.includes('freelancer')) {
            return res.status(400).json({ message: "User is not a freelancer" });
        }

        const freelancer = await Freelancer.findOneAndUpdate({ userId }, { portfolio, skills }, { new: true });
        if (!freelancer) {
            return res.status(404).json({ message: "Freelancer not found" });
        }

        res.status(200).json({ message: "Freelancer updated successfully", freelancer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};