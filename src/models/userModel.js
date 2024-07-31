const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    media: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const ContactInfoSchema = new mongoose.Schema({
    phone:{
        type: String,
        default: ""
    },
    socialMedia: {
        linkedin: String,
        whatsapp: String,
        instagram: String,
    },
    address: String
});

const ResourceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['workshop', 'event', 'course'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    sourceLink: String,
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    company: String,
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Makeup Artist', 'Fashion Designer', 'Photographer', 'UX/Graphics Designer','Painter', 'Other'],
        required: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    portfolio: [PortfolioSchema],
    bio: {
        type: String,
        maxlength: 200
    },
    contactInfo: ContactInfoSchema,
    profileVisibility: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['job', 'volunteer', 'hiring'],
        default: 'job'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    notifications: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        default: ""
    }
});


const WorkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    tags: {
        type: [String],
        default: [],
    },
    workImageLink: {
        type: String,
        default: '', 
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
    },
});


const Resource = mongoose.model('Resource', ResourceSchema);
const User = mongoose.model('User', UserSchema);
const Work = mongoose.model('Work', WorkSchema);

module.exports = { User, Resource , Work };
