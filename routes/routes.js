const fs = require('fs');
const path = require('path');

module.exports = app => {

    // set up notes var
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API routes
        // -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - --
    
        // set up /api/notes "get" route
        app.get("/api/notes", function(req, res) {

            // reads db.json file, returns all saved notes as JSON
            res.json(notes);
        });

        // set up /api/notes "post" route
        app.post("/api/notes", function(req,res) {

            // receives new note, adds it to db.json, returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Your note has been successfully saved! It's saved as"+newNote.title);
        });

        // gets note w/ specific id
        app.get("/api/notes/:id", function(req,res) {
            // display json for notes array
            res.json(notes[req.params.id]);
        });

        // deletes specified id note
        app.delete("/api/notes/:id", function(req,res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Note deleted: "+req.params.id);
        });

        // HTML Routes
        // -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - -- - --

        // displays notes.html
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // displays index.html w/ everything else
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // updates JSON file whenever a note is added/deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}