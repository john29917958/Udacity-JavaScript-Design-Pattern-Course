/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function(){

	    var model = {
	        init: function() {
	            if (!localStorage.notes) {
	                localStorage.notes = JSON.stringify([]);
	            }
	        },
	        add: function(obj) {
	            var data = JSON.parse(localStorage.notes);
	            data.push(obj);
	            localStorage.notes = JSON.stringify(data);
	        },
	        getAllNotes: function() {
	            return JSON.parse(localStorage.notes);
	        }
	    };


	    var octopus = {
	        addNewNote: function(noteStr) {
	            model.add({
	                content: noteStr,
	                date: Date.now()
	            });
	            view.render();
	        },

	        getNotes: function() {
	            return model.getAllNotes().reverse();
	        },

	        init: function() {
	            model.init();
	            view.init();
	        }
	    };


	    var view = {
	        init: function() {
	            this.noteList = $('#notes');
	            var newNoteForm = $('#new-note-form');
	            var newNoteContent = $('#new-note-content');
	            newNoteForm.submit(function(e){
	                octopus.addNewNote(newNoteContent.val());
	                newNoteContent.val('');
	                e.preventDefault();
	            });
	            view.render();
	        },
	        render: function() {
	            var htmlStr = '';
	            octopus.getNotes().forEach(function(note){
	                htmlStr += '<li class="note">'+
	                    note.content + '<br>' + new Date(note.date).toString() +
	                    '</li>';
	            });
	            this.noteList.html( htmlStr );
	        }
	    };

	    octopus.init();
	});

/***/ }
/******/ ]);