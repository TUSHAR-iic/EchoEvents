const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})
const contactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
    },
    eventMode: {
        type: String,
        required: true,
    },
    eventImage: {
        type: String, // Base64 image or file path
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const EventCollection = mongoose.model('EventCollection', eventSchema);

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

const ReviewCollection = mongoose.model('ReviewCollection', reviewSchema);

module.exports = { LogInCollection, ContactMessage, ReviewCollection, EventCollection };
