var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/clgnews');
var trainings=db.get('trainings');
var workshops=db.get('workshops');
var seminars=db.get('seminars');
var eventgallery=db.get('eventgallery');
var placedcandidates=db.get('placedcandidates');
var cdrive=db.get('cdrive');
var exam=db.get('exam');
var tech=db.get('techbit');
var articles=db.get('articles');
var trainers=db.get('trainers');
var multer  = require('multer');

//----Uploading Code
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
            //var datetimestamp = Date.now();
            cb(null, file.originalname)
        }
});
var upload = multer({ storage: storage })
// ----Upload Code End

//----HomePage---
router.get('/', function(req, res) {
    trainings.find({}, function(err,docs){
    console.log(docs.length);
    res.locals.tcount=docs.length;
    
    });
       articles.find({}, function(err,docs){
    console.log(docs.length);
    res.locals.acount=docs.length;
    
    });
          tech.find({}, function(err,docs){
    console.log(docs.length);
    res.locals.tcount=docs.length;
    
    });
             trainings.find({}, function(err,docs){
    console.log(docs.length);
    res.locals.tcount=docs.length;
    
    });
     workshops.find({}, function(err,docs){
    console.log(docs.length);
    res.locals.wcount=docs.length;
     res.render('index');
    });
   
});
//----Homepage End 

//----------------------------------------trainings-----------------------------------> 
//trainings datatables
router.get('/trainings', function(req, res) {
    trainings.find({},function(err,docs){
        res.locals.trainings = docs;
  res.render('trainings_form');
});
});

//Adding New Training Details 
router.post('/addtraining', upload.single('image'), function(req, res) {
    console.log(req.body.name);
    var data = {
        name : req.body.name,
        conducted_by : req.body.conducted_by,
        price: req.body.price,
        date : req.body.date,
        trainerid : req.body.trainerid,
        college : req.body.college,
        bhavan: req.body.bhavan,
        floor: req.body.floor,
        roomno: req.body.roomno,
        lab: req.body.lab,
        image : 'uploads/' + req.file.originalname
    }
    trainings.insert(data, function(err,data){
    console.log(data);
    res.redirect('/trainings');
    });
});

//find and edit Training Details
router.post('/edit_training', function(req, res) {
    console.log(req.body.sno);
    var id = req.body.sno;
    trainings.find({"_id":id}, function(err,docs){
        console.log(docs);
      res.send(docs);
    });
});
//remove Training Details
router.post('/remove_training', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    trainings.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//update Training Details
router.post('/update_training', function(req, res) {
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.body.price);
    var data = {

        
        name : req.body.name,        
        price: req.body.price,
        date : req.body.date,
        conducted_by : req.body.conducted_by,
        trainerid : req.body.trainerid,
        college : req.body.college,
        bhavan: req.body.bhavan,
        floor: req.body.floor,
        roomno: req.body.roomno,
        lab: req.body.lab,
         // image :'uploads/' + req.file.originalname
    }
  trainings.update({"_id":req.body.id},{$set:data}, function(err,docs){
    console.log(docs);
    res.redirect('/trainings');
  });
});
//----------------------------- End of Training---------------------------------------------------------------->


//-----------------------------Workshops----------------------------------------------------------------------->
//workshops datatables
router.get('/workshops', function(req, res) {
    workshops.find({},function(err,docs){
      // console.log(docs);
        res.locals.workshops= docs;
  res.render('workshops_form');
});
});
//Adding New Workshop
router.post('/add_workshops', upload.single('image'), function(req, res) {
    //console.log(req.body.trainer);
    //console.log(req.body.conducted_by);
    //console.log(req.body.date);
    //console.log(req.body.password);
    var data = {
        name : req.body.name,
        price: req.body.price,
        date : req.body.date,
        conducted_by : req.body.conducted_by,
        trainerid : req.body.trainerid,
        college : req.body.college,
        bhavan: req.body.bhavan,
        floor: req.body.floor,
        roomno: req.body.roomno,
        lab : req.body.lab,
        image : 'uploads/' + req.file.originalname
    }
    workshops.insert(data, function(err,data){
    console.log(data);
    res.redirect('/workshops');
    });
});

//find and edit Woekshop
router.post('/edit_workshop', function(req, res) {
    console.log(req.body.sno);
    var id = req.body.sno;
    workshops.find({"_id":id}, function(err,docs){
        console.log(docs);
      res.send(docs);
    });
});
//remove Workshop
router.post('/remove_workshop', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    workshops.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//update Workshop
router.post('/update_workshop', function(req, res) {
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.body.price);
    var data = {

        
        name : req.body.name,
        price: req.body.price,
        date : req.body.date,
        conducted_by : req.body.conducted_by,
        trainerid : req.body.trainerid,
        college : req.body.college,
        bhavan: req.body.bhavan,
        floor: req.body.floor,
        roomno: req.body.roomno,
        lab : req.body.lab,
         // image :'uploads/' + req.file.originalname
    }
  workshops.update({"_id":req.body.id},{$set:data}, function(err,docs){
    console.log(docs);
    res.redirect('/workshops');
  });
});

//-------------------------------------------------End of Workshops----------------------------------------->


//----------------------------------------------seminars------------------------------------------->
router.get('/seminars', function(req, res) {
    seminars.find({},function(err,docs){
        res.locals.seminars = docs;
  res.render('seminars_form');
});
});
router.post('/add_seminar', upload.single('image'), function(req, res) {
 
    var data = {
        topic : req.body.topic,
        seminar_by : req.body.seminar_by,
        from : req.body.from,
        date : req.body.date,
        audience : req.body.audience,
        college : req.body.college,
        bhavan: req.body.bhavan,
        floor: req.body.floor,
        roomno: req.body.roomno

    }
    seminars.insert(data, function(err,data){
    console.log(data);
    res.redirect('/seminars');
    });
});

//find and edit
router.post('/edit_seminar', function(req, res) {
    console.log(req.body.sno);
    var id = req.body.sno;
    seminars.find({"_id":id}, function(err,docs){
        console.log(docs);
      res.send(docs);
    });
});
//remove
router.post('/remove_seminar', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    seminars.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//update
router.post('/update_seminar', function(req, res) {
    console.log(req.body.topic);
    console.log(req.body.description);
    console.log(req.body.price);
    var data = {

        
        topic : req.body.topic,
        seminar_by : req.body.seminar_by,
        from : req.body.from,
        date : req.body.date,
        audience : req.body.audience,
        college : req.body.college,
        bhavan: req.body.bhavan,
        floor: req.body.floor,
        roomno: req.body.roomno,
         // image :'uploads/' + req.file.originalname
    }
  seminars.update({"_id":req.body.id},{$set:data}, function(err,docs){
    console.log(docs);
    res.redirect('/seminars');
  });
});

//=================================Seminars End======================>

//=================================event galary starts======================>
router.get('/event', function(req, res) {
    eventgallery.find({},function(err,docs){
        res.locals.eventgallery = docs;
  res.render('eventgallery_form');
});
});
//multiple uploads
/*
router.post('/add_event', upload.array('photos', 12), function(req, res) {
    console.log(req.file);
    res.redirect('/event');
});  */
router.post('/add_event', upload.any(), function(req,res){
 // console.log("req.body"); //form fields
  //console.log(req.body.name);
   //console.log(req.body.year);
  //console.log("req.file");
  // console.log(req.files.length);
   //console.log(req.files[0].filename);
   // console.log(req.files[1].filename);
  //console.log(req.files); //form files
  var links=[];
  var i;
  if(req.files.length==12){
  for(i=0;i<=req.files.length-1;i++)
  {  
    links[i]='uploads/' + req.files[i].filename;
    console.log(links[i]);
  }

var data = {
        name : req.body.name,
        year : req.body.year,
        links:links
       
    }
    eventgallery.insert(data, function(err,data){
    console.log(data);
    res.redirect('/event');
    });   }
    else{
     res.redirect('/event');   
    }
});

//find and edit

//------------------------remove-----------------------------
router.post('/remove_event', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    eventgallery.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//--------------------------END----------------------------//


//-----------------------placed candidates STARTS------------->>
router.get('/placedcandidates', function(req, res) {
    placedcandidates.find({},function(err,docs){
        res.locals.placedcandidates = docs;
  res.render('placedcandidates_form');
});
});
router.post('/add_candidate', upload.single('image'), function(req, res) {
    console.log(req.body.name);
    //console.log(req.body.date);
    //console.log(req.body.password);
    var data = {
        name : req.body.name,
        rollno : req.body.rollno,
        companyname : req.body.companyname,
        package : req.body.package,
        
        
        
        
        
        
    }
    placedcandidates.insert(data, function(err,data){
    console.log(data);
    res.redirect('/placedcandidates');
    });
});



//-----------------------------------remove---------------------------------//
router.post('/remove_placedcandidate', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    placedcandidates.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//------------------------------------end-----------------------------//


//-----------------------------------cdrive starts---------------------//
router.get('/cdrive', function(req, res) {
    cdrive.find({},function(err,docs){
        res.locals.cdrive = docs;
  res.render('cdrive_form');
});
});
router.post('/add_cdrive', upload.single('image'), function(req, res) {
    console.log(req.body.name);
    //console.log(req.body.date);
    //console.log(req.body.password);
    var data = {
        name : req.body.name,
        package : req.body.package,
        image : 'uploads/' + req.file.originalname
    }
    cdrive.insert(data, function(err,data){
    console.log(data);
    res.redirect('/cdrive');
    });
});



//----------------------------------------remove------------------------------------->>
router.post('/remove_cdrive', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    cdrive.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//-------------------------------------------------END------------------------------------>>


//---------------------------------Examupdates--------------------------------------//
router.get('/exam', function(req, res) {
    exam.find({},function(err,docs){
        res.locals.examupdates = docs;
  res.render('examupdates_form');
});
});
//add exam upadate
router.post('/add_exam', upload.single('image'), function(req, res) {
    console.log(req.body.title);
    console.log(req.body.course);
    console.log(req.body.regulation);
    //console.log(req.body.date);
    //console.log(req.body.password);
    var data = {
        date : req.body.date,
        title : req.body.title,
        course : req.body.course,
        category : req.body.category,
        regulation : req.body.regulation,
        type : req.body.type,
        
        
        image : 'uploads/' + req.file.originalname
    }
    exam.insert(data, function(err,data){
    console.log(data);
    res.redirect('/exam');
    });
});



//------------------------------------------remove-------------------------------------//
router.post('/remove_exam', function(req, res) {
    console.log(req.body.sno);
    var id = req.body.sno;
    exam.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//------------------------------------------END---------------------------------------


//----------------------------------Tech news------------------------------------------------------//
//tech datatables
router.get('/tech', function(req, res) {
    tech.find({},function(err,docs){
        res.locals.technews = docs;
  res.render('technews_form');
});
});
//add tech news
router.post('/add_technews', upload.single('image'), function(req, res) {
    console.log(req.body.name);
    //console.log(req.body.date);
    //console.log(req.body.password);
    var data = {
        title : req.body.title,
        description : req.body.description,
        author : req.body.author,
        rollno : req.body.rollno,
        conclusion: req.body.conclusion,
        
        
        
        image : 'uploads/' + req.file.originalname
    }
    tech.insert(data, function(err,data){
    console.log(data);
    res.redirect('/tech');
    });
});

//find and edit

//removing technews
router.post('/remove_technews', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    tech.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});

//---------------------------END-------------------------------------


//--------------------------------articles--------------------------------------//
//article datatables
router.get('/articles', function(req, res) {
    articles.find({},function(err,docs){
        res.locals.articles = docs;
  res.render('articles_form');
});
});
//Adding new article details
router.post('/add_article', upload.single('image'), function(req, res) {
    console.log(req.body.name);
    //console.log(req.body.date);
    //console.log(req.body.password);
    var data = {
        name : req.body.name,
        description : req.body.description,
        
        rollno : req.body.rollno,
        college: req.body.college,
        wrby : req.body.wrby,
        year : req.body.year,
        
        image : 'uploads/' + req.file.originalname
    }
    articles.insert(data, function(err,data){
    console.log(data);
    res.redirect('/articles');
    });
});

//find and edit

//removing articles
router.post('/remove_article', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    articles.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//End of articles
router.get('/trainers', function(req, res) {
    trainers.find({},function(err,docs){
        res.locals.trainers = docs;
  res.render('trainer_form');
});
});
//Adding new article details
router.post('/add_trainer', upload.single('image'), function(req, res) {
    console.log(req.body.name);
    //console.log(req.body.date);
    //console.log(req.body.password);
    var data = {
        name : req.body.name,
        contact : req.body.contact,
        
        areas : req.body.areas,
        trainerid: req.body.trainerid,
        register : req.body.register,
        
        
        image : 'uploads/' + req.file.originalname
    }
    trainers.insert(data, function(err,data){
    console.log(data);
    res.redirect('/trainers');
    });
});

//find and edit
router.post('/edit_trainer', function(req, res) {
    console.log(req.body.sno);
    var id = req.body.sno;
    trainers.find({"_id":id}, function(err,docs){
        console.log(docs);
      res.send(docs);
    });
});

//removing articles
router.post('/remove_trainer', function(req, res) {
    //console.log(req.body.sno);
    var id = req.body.sno;
    trainers.remove({"_id":id}, function(err,docs){
        //console.log(docs);
      res.send(docs);
    });
});
//-----------------front END----->
//rendering

//Trainings Display
router.get('/mainpage', function(req, res) {
    trainings.find({},function(err,docs){
         console.log(docs);
        res.locals.trainings = docs;

});
    seminars.find({},function(err,docs){
         console.log(docs);
        res.locals.seminars = docs;
 
}); 
   
    exam.find({},function(err,docs){
        res.locals.examupdates = docs;
 
});
   
    workshops.find({},function(err,docs){
       console.log(docs);
        res.locals.workshops= docs;
 
});
        cdrive.find({},function(err,docs){
            console.log(docs);
        res.locals.cdrive = docs;

});
       eventgallery.find({},function(err,docs){
         console.log(docs);
        res.locals.eventgallery = docs;

});
           placedcandidates.find({},function(err,docs){
             console.log(docs);
        res.locals.placedcandidates = docs;

 
});
            tech.find({},function(err,docs){
                 console.log(docs);
        res.locals.technews = docs;
            
});
                articles.find({},function(err,docs){
                     console.log(docs);
        res.locals.articles = docs;
 res.render('home');   
});
   
});
router.post('/trainings_venue', function(req, res) {
    console.log(req.body.sno);
    var id = req.body.sno;
    trainings.find({"_id":id}, function(err,docs){
        console.log(docs);
      res.send(docs);
    });

});
router.post('/workshops_venue', function(req, res) {
    console.log(req.body.sno);
    var id = req.body.sno;
    workshops.find({"_id":id}, function(err,docs){
        console.log(docs);
      res.send(docs);
    });

});
//
//show tainer details
//edit
router.post('/trainer', function(req, res) {
    console.log(req.body.sno);
    var trainerid = req.body.sno;
    trainers.find({"trainerid":trainerid}, function(err,docs){
        console.log(docs);
      res.send(docs);
    });
});
module.exports = router;
