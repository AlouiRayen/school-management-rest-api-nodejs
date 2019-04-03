const mongoose = require('mongoose');
const Joi = require('joi');

var Schema = mongoose.Schema;
const coursSchema  = mongoose.Schema({
    sigle:{
        type:String,
        required:true,
        maxlength:5,
        minlength:5
            },
        intitule:{
            type:String,
            required:true,
            minlength:5
        },
        enseignant:{
            type:Schema.Types.ObjectId,ref:'Enseignant'
        },
        nombreseance:{
            type:Number,
            required:true
        },
        etudiantsinscri:[{type:Schema.Types.ObjectId,ref:'Etudiant'}],
        seances:[{type:Schema.Types.ObjectId,ref:'Seance'}]

});

const Cours = mongoose.model('Cours',coursSchema);

function  validateCours(cours){
    const Schema={
      
        sigle : Joi.string().required().max(5).min(5),
        intitule : Joi.string().required().min(5),
        nombreseance:Joi.number().required()
       
    }
    return Joi.validate(cours,Schema);
}

module.exports.Cours=Cours;
module.exports.validateCours=validateCours;
