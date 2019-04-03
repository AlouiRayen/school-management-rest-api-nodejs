const {Etudiant,validateEtudiant} = require('../models/etudiant');
const {Cours,validateCours} = require('../models/cours');
const {Seance} = require('../models/seance');
const mongoose = require('mongoose');



module.exports= {

    showall: async(req,res)=>{
        const etudiants = await Etudiant.find().populate('cours');//
        if (etudiants.length==0) { res.status(400).send('Empty collection');
    
    }else res.send(etudiants);
    },

    addEtudaint: async (req,res)=>{
        var {error} = validateEtudiant(req.body);
        if(error)return res.status(400).send('bad request'+error.details[0].message);
        var etudiant = new Etudiant(req.body);
        var result = await etudiant.save();
        res.send(result);
    
        },
    
    getoneEtudiant : async (req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var etudiant = await Etudiant.findById(req.params.id);
        if(!etudiant) return res.status(404).send('requested course not found');
        
        res.send(etudiant);
    },
    
    
    updateEtudiant: async(req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var etudiant = await Etudiant.findById(req.params.id);
        if(!etudiant) return res.status(404).send('requested student not found');
        var {error} = validateEtudiant(req.body);
        if(error)return res.status(400).send('bad request'+error.details[0].message);

        if (req.body.numetudiant) etudiant.numetudiant = req.body.numetudiant;
        if (req.body.nom)etudiant.nom = req.body.nom;
        if (req.body.prenom) etudiant.prenom = req.body.prenom;
        if (req.body.age) etudiant.age = req.body.age;

    
        var result = await etudiant.save();
        res.send(result);
    },
    deleteEtudiant : async (req,res)=>{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
    var result = await Etudiant.findByIdAndRemove(req.params.id);
    res.send(result);
    },

    sinscrire: async(req,res)=>{
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('it"s not a valid id');
        var etudiant = await Etudiant.findById(req.params.id);

        if (!mongoose.Types.ObjectId.isValid(req.params.idcours)) return res.status(400).send('it"s not a valid id');
        var cours = await Cours.findById(req.params.idcours);


        etudiant.listedescours.push(cours);
        await etudiant.save();
        cours.etudiantsinscri.push(etudiant);
         await cours.save();
    },

    agefilter: async(req,res)=>{
        const etudiants = await Etudiant.find().populate('cours');//
        if (etudiants.length==0) res.status(400).send('Empty collection');

        etudiants.forEach(etudiant => {if (etudiant.age<req.params.age){
             res.send(`${etudiant.nom}  ${etudiant.prenom}`);
            
        }
            
        });
    
    

    }



}