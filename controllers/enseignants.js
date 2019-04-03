const {Enseignant,validateEnseignant} = require('../models/enseignant');
const mongoose = require('mongoose');



module.exports= {

    enseignants: async(req,res)=>{
        const enseignants = await Enseignant.find().populate('cours');//
        if (enseignants.length==0) { res.status(400).send('Empty collection');
    
    }else res.send(enseignants);
    },

    addEnseignant: async (req,res)=>{
        var {error} = validateEnseignant(req.body);
        if(error)return res.status(400).send('bad request'+error.details[0].message);
        var enseignant = new Enseignant(req.body);
        var result = await enseignant.save();
        res.send(result);
    
        },
    
    getoneEnseignant : async (req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var enseignant = await Enseignant.findById(req.params.id);
        if(!enseignant) return res.status(404).send('requested course not found');
        
        res.send(enseignant);
    },
    
    
    updateEnseignant: async(req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var enseignant = await Enseignant.findById(req.params.id);
        if(!enseignant) return res.status(404).send('requested student not found');
        var {error} = validateEnseignant(req.body);
        if(error)return res.status(400).send('bad request'+error.details[0].message);

        
        if (req.body.nom)enseignant.nom = req.body.nom;
        if (req.body.prenom) enseignant.prenom = req.body.prenom;
       

    
        var result = await enseignant.save();
        res.send(result);
    },
    deleteEnseignant : async (req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
    var result = await Enseignant.findByIdAndRemove(req.params.id);
    res.send(result);
    }

}