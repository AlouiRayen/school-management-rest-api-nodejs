const mongoose = require('mongoose');
const Joi = require('joi');

var Schema = mongoose.Schema;

const seanceSchema  = mongoose.Schema({
    
    numseance:{
        type:Number,
        required:true
       
    },
    typeintervention:{
        type:String,
        required:true,
        maxlength:2,
        minlength:2
    },
    cours:{type:Schema.Types.ObjectId,ref:'Cours'},
    date:{
        required:true,
        type:Date
    },
    heuredeb:{
        required:true,
        type:Date
    },
    heurefin:{
        required:true,
        type:Date
    },
    salle:{
       
            required:true,
            type:String
       
    },
    enseignant:{type:Schema.Types.ObjectId,ref:'Enseignant'}
});

const Seance = mongoose.model('Seance',seanceSchema);

function validateSeance ( seance){
    const Schema= {
        numseance: Joi.number().required(),
        typeintervention: Joi.String().max(2).min(2).required(),
        date: Joi.date().required(),
        heuredeb:Joi.date().required(),
        heurefin:Joi.date().required()
    }
    return Joi.validate(seance,Schema);
}

module.exports.validateSeance=validateSeance;
module.exports.Seance=Seance;