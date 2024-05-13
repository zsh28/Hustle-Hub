const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freelancerSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    portfolio: {
        type: [{
            title: String,
            description: String,
            link: String
        }],
        required: [true, 'Portfolio is required']
    },
    skills: {
        type: [String],
        required: [true, 'Skills are required']
    },
});

module.exports = mongoose.model('Freelancer', freelancerSchema);