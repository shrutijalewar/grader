'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

function Student(body){
  this.name =body.name;
  this.color =body.color;
  this.tests = []; 
  this.gpa =0;
  this.isSuspended =false;
  this.isHonorRoll =false;
  this.letterGrade= 'U';
}

Object.defineProperty(Student, 'collection', {
  get: function(){return global.mongodb.collection('students');}
});

Student.prototype.save = function(cb){
  Student.collection.save(this, cb);
};

Student.all = function(cb){
  Student.collection.find().toArray(function(err, objects){
    var students = objects.map(function(o){
      return changePrototype(o);
    });

    cb(students);
  });
};

Student.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Student.collection.findOne({_id:_id}, function(err, obj){
    var student = changePrototype(obj);

    cb(student);
  });
};

Student.prototype.test= function(score){
  this.tests.push(parseFloat(score));
  this.save(function(){});
};

Student.prototype.avg= function(){
var sum=0;
for (var i=0; i<this.tests.length; i++){
  sum+=this.tests[i];
}
var average =sum/this.tests.length;
return average;
};
module.exports = Student;


// PRIVATE FUNCTIONS ///

function changePrototype(obj){
  var student = _.create(Student.prototype, obj);
  return student;
}
