/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Student = require('../../app/models/student');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var s1, s2;

describe('Student', function(){
  before(function(done){
    dbConnect('student-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Student.collection.remove(function(){
      s1 = new Student({name:'Sara Jane', color:'pink', tests:[]});
      s2 = new Student({name:'Billy Jo', color:'blue'});
      var t1 = '89.5';
      var t2 = '50.7';
      var t3 = '95';
      s1.tests.push(t1, t2, t3);
      s1.save(function(){
        s2.save(function(){
          done();
          });
       });
    });
  });
describe('constructor', function(){
    it('should create a new Student object', function(){
      expect(s1).to.be.instanceof(Student);
      expect(s1.name).to.equal('Sara Jane');
      expect(s1.color).to.equal('pink');
      expect(s1.isSuspended).to.equal(false);
      expect(s1.gpa).to.equal(0);
      expect(s1.isHonorRoll).to.equal(false);
    });
  });
 describe('#save', function(){
    it('should insert a new student into the database', function(done){
      var s3 = new Student({name:'Jonny Cash', color:'green'});
      s3.save(function(){
        expect(s3._id).to.be.instanceof(Mongo.ObjectID);
        done();
    });
  });
  });
 describe('.all', function(){
    it('should get all students from database', function(done){
      Student.all(function(students){
        expect(students).to.have.length(2);
        expect(s1._id).to.be.instanceof(Mongo.ObjectID);
        //expect(s1).to.respondTo('test');
        done();
      });
    });
describe('.findById', function(){
    it('should find a student by its id', function(done){
      Student.findById(s1._id.toString(), function(student){
        expect(student.name).to.equal('Sara Jane');
        expect(student.color).to.equal('pink');
        done();
      });
    });
  });
 });
describe('.test', function(){
    it('should add a test score', function(done){
      var t1 = '89.5';
      var t2 = '50.7';
      var t3 = '95';
      var s4 = new Student({name:'Sue Ann', color:'blue'});
      s4.test(t1);
      s4.test(t2);
      s4.test(t3);
        expect(s4.tests.length).to.equal(3);
        expect(s4.tests[0]).to.equal(89.5);
        done();
       });
   });

describe('.avg', function(){
    it('should calculate an avg score', function(done){
        expect(s1.avg).to.be.closeTo(78.4, 0.5);
        //expect(s1.letterGrade).to.equal('C');
        done();
       });
    });
 });

