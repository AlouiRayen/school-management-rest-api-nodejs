const {Seance,validateSeance} = require('../models/seance');
const mongoose = require('mongoose');



module.exports= {

    seances: async(req,res)=>{
        const seances = await Seance.find().populate('cours');//
        if (courses.length==0) { res.status(400).send('Empty collection');
    
    }else res.send(seances);
    },

    addseance: async (req,res)=>{
        var {error} = validateSeance(req.body);
        if(error)return res.status(400).send('bad request'+error.details[0].message);
        var seance = new Seance(req.body);
        var result = await seance.save();
        res.send(result);
    
        },
    
    getoneSeance : async (req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var seance = await Seance.findById(req.params.id);
        if(!seance) return res.status(404).send('requested course not found');
        
        res.send(seance);
    },
    
    
    updateSeance: async(req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var seance = await Seance.findById(req.params.id);
        if(!seance) return res.status(404).send('requested student not found');
        var {error} = validateSeance(req.body);
        if(error)return res.status(400).send('bad request'+error.details[0].message);

        
        if (req.body.sigle)cours.sigle= req.body.sigle;
        if (req.body.intitule)cours.intitule= req.body.intitule;
        if (req.body.nombreseance)cours.nombreseance= req.body.nombreseance;
       
       

    
        var result = await seance.save();
        res.send(result);
    },
    deleteSeance : async (req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
    var result = await Seance.findByIdAndRemove(req.params.id);
    res.send(result);
    }

}