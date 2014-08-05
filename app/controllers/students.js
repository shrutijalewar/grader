'use strict';

var Student = require('../models/student');

exports.init = function(req, res){
  res.render('students/init');
};

exports.create = function(req, res){
  var student = new Student(req.body);
  student.save(function(){
    res.redirect('/students');
  });
};

exports.index = function(req, res){
  Student.all(function(student){
    res.render('students/index', {student:student});
  });
};

exports.show = function(req, res){
  Student.findById(req.params.id, function(student){
    res.render('students/show', {student:student});
  });
};
