const express = require('express');

const etudiants = require('../controllers/etudiants');
const enseignants = require('../controllers/enseignants');
const courses = require('../controllers/courses');
const seances = require('../controllers/seances');

const  router = express.Router();

router.route('/etudiant/')
.get(etudiants.showall)
.post(etudiants.addEtudaint);

router.route('/etudiant/:id')
.get(etudiants.getoneEtudiant)
.put(etudiants.updateEtudiant)
.delete(etudiants.deleteEtudiant);

router.route('/etudiant/:id/signup/:idcours')
.get(etudiants.sinscrire);

router.route('/etudiant/agefilter/:age')
.get(etudiants.agefilter);

//enseignant

router.route('/enseignant/')
.get(enseignants.enseignants)
.post(enseignants.addEnseignant);

router.route('/enseignant/:id')
.get(enseignants.getoneEnseignant)
.put(enseignants.updateEnseignant)
.delete(enseignants.deleteEnseignant);

//cours

router.route('/cours/')
.get(courses.cources)
.post(courses.addCourse);

router.route('/cours/:id')
.get(courses.getoneCourse)
.put(courses.updateCourse)
.delete(courses.deleteCourse);

router.route('/cours/etudiants/:id')
.get(courses.getallstudents);

//seances

router.route('/seance/')
.get(seances.seances)
.post(seances.seances);

router.route('/seance/:id')
.get(seances.getoneSeance)
.put(seances.updateSeance)
.delete(seances.deleteSeance);

module.exports=router;





