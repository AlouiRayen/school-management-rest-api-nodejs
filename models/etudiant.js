const mongoose = require('mongoose');
const Joi = require('joi');

var Schema = mongoose.Schema;
const etudiantSchema  = mongoose.Schema({
    numetudiant:{
        type:Number,
        required:true, },
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
        age:{
            type:Number,
            required:true
        },
        listedescours:[{
            type:Schema.Types.ObjectId,ref:'Cours'
        }]
});

const Etudiant = mongoose.model('Etudiant',etudiantSchema);

function validateEtudiant (etudiant){
    const Schema={
        numetudiant : Joi.number().required(),
        nom : Joi.string().required().max(12).min(5),
        prenom : Joi.string().required().max(12).min(5),
        age : Joi.number().required()
    
    }
    return Joi.validate(etudiant,Schema);
}

module.exports.validateEtudiant=validateEtudiant;
module.exports.Etudiant=Etudiant;
 