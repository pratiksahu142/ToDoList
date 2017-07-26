var express = require('express'),
    router = express.Router(),
    mongojs = require('mongojs')
    db = mongojs('mongodb://pratiksahu:password@ds123933.mlab.com:23933/mytasklist', ['tasks']);
//GET ALL TASKS
router.get('/tasks', function(req,res,next){
    db.tasks.find(function(error, task){
        if(error)
            res.send("error");
        res.json(task);
    })
    //res.send("TASKS PAGE");
});

//GET SINGLE TASK
router.get('/tasks/:id', function(req,res,next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(error, task){
        if(error)
            res.send("error");
        res.json(task);
    })
    //res.send("TASKS PAGE");
});

//Create SINGLE TASK
router.post('/task', function(req,res,next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "bad data"
        });
    }
    else {
        db.tasks.save(task, function(error,task){
            if(error)
                 res.send("error");
            res.json(task);
        });
    }
});


//DELETE SINGLE TASK
router.delete('/task/:id', function(req,res,next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(error, task){
        if(error)
            res.send("error");
        res.json(task);
    })
});

//UPDATE SINGLE TASK
router.put('/task/:id', function(req,res,next){
    var task = req.body;
    var updTask = {};
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    if(task.title){
        updTask.title = task.title;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error" : "bad data"
        });
    } else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(error, task){
        if(error)
            res.send("error");
        res.json(task);
    });
    }

});

module.exports = router;