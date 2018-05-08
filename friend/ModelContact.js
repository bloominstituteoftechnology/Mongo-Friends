const mongoose = require('mongoose');

const definition = {
    _id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    mobile_number: {
        type: Number,
        required: false,
    },
    github_username: {
        type: String,
        required: false,
    },
    facebook_username: {
        type: String,
        required: false,
    },
    twitter_handle: {
        type: String,
        required: false,
    },
    // contactInfo: [{ type: ObjectId, ref: 'contactInfo' }],
    createdOn: {
        type: Date,
        default: Date.now,
    },
};


const options = {
    timestamps: true
};

const contactSchema = new mongoose.Schema(definition,  options);

const ModelContact = mongoose.model("Contact", contactSchema, "contacts");

module.exports = ModelContact;




// var TaskSchema = new Schema({
//     title: String,
//     list: { type: Schema.ObjectId, ref: 'list' }

// });

// var Task = mongoose.model('task', TaskSchema);

// var ListSchema = new Schema({
//     title: String,
//     tasks: [{ type: Schema.ObjectId, ref: 'task' }]
// });

// var List = mongoose.model('list', ListSchema);

// app.post('/lists/:list_id/tasks', function(req, res) {

//     var listId = req.params.list_id;   

//     var newTask = new Task();
//     newTask.title = req.body.title;
//     newTask.list = listId; 


//     // WHEN SAVING, WRAP THE REST OF THE CODE

//     newTask.save(function (err){
//        if (err) {
//             console.log('error saving new task');
//             console.log(err);
//         } else {
//             console.log('new task saved successfully'); 

//             list.findById(listId), function(err, doc){

//                 doc.tasks.push(newTask);

//                 doc.save(function (err){
//                     if (err) {
//                     console.log('error adding new task to list');
//                     console.log(err);
//                     } else {

//                     console.log('new task saved successfully'); 
//                     res.redirect('/lists/' + listId);

//                     }  
//                 });
//             });
//         });
//     });
// });