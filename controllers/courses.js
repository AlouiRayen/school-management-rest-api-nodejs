const {Cours,validateCours} = require('../models/cours');
const mongoose = require('mongoose');



module.exports= {

    cources: async(req,res)=>{
        const courses = await Cours.find().populate('cours');//
        if (courses.length==0) { res.status(400).send('Empty collection');
    
    }else res.send(courses);
    },

    addCourse: async (req,res)=>{
        var {error} = validateCours(req.body);
        if(error)return res.status(400).send('bad request'+error.details[0].message);
        var cours = new Cours(req.body);
        var result = await cours.save();
        res.send(result);
    
        },
    
    getoneCourse : async (req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var cours = await Cours.findById(req.params.id);
        if(!cours) return res.status(404).send('requested course not found');
        
        res.send(cours);
    },
    
    
    updateCourse: async(req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var cours = await Cours.findById(req.params.id);
        if(!cours) return res.status(404).send('requested student not found');
        var {error} = validateCours(req.body);
        if(error)return res.status(400).send('bad request'+error.details[0].message);

        
        if (req.body.sigle)cours.sigle= req.body.sigle;
        if (req.body.intitule)cours.intitule= req.body.intitule;
        if (req.body.nombreseance)cours.nombreseance= req.body.nombreseance;
       
       

    
        var result = await cours.save();
        res.send(result);
    },
    deleteCourse : async (req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
    var result = await Cours.findByIdAndRemove(req.params.id);
    res.send(result);
    },

    getallstudents: async(req,res)=>{
        var cours = await Cours.findById(req.params.id).populate('etudiants');
        if(!cours) return res.status(404).send('requested course not found');
         
         res.send(cours.etudiantsinscri);
    }

}