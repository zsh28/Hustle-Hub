const express = require("express");
const {
    addFreelancer,
    getFreelancer,
    updateFreelancer
} = require("../controllers/FreelancerController");
const router = express.Router();

router.post("/", addFreelancer);
router.get("/:userId", getFreelancer);
router.patch("/:userId", updateFreelancer);