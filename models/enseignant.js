const mongoose = require('mongoose');
const Joi = require('joi');

var Schema = mongoose.Schema;

const enseignantSchema  = mongoose.Schema({
    
        nom:{
            type:String,
            required:true,
            maxlength:12,
            minlength:5
        },
        prenom:{
            type:String,
            required:true,
            maxlength:12,
            minlength:5
        },
        cours:{type:Schema.Types.ObjectId,ref:'Cours'},
        seances:[{type:Schema.Types.ObjectId,ref:'Seance'}]
});
const Enseignant = mongoose.model('Enseignant',enseignantSchema);

    function  validateEnseignant(enseignant){
        const Schema={
        
            nom : Joi.string().required().max(12).min(5),
            prenom : Joi.string().required().max(12).min(5)
        
        }
        return Joi.validate(enseignant,Schema);
    }

    module.exports.Enseignant=Enseignant;
    module.exports.validateEnseignant=validateEnseignant;