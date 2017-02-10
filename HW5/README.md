# Requirements Checklist
* node db.js creates a SQLite database called music.db, populated by the data from songs.json and playlists.json from exercise 3. (2 marks)
* Your database scheme matches the tables defined here. (2 marks)
* Your primary keys (id) for each table auto-increments. (1 marks)
* Your GET /api/playlists pulls data from the database and returns the same data as it did in exercise 3 (matching the content in playlists.json). (2 marks)
* Your GET /api/songs pulls data from the database and returns the same data as it did in exercise 3 (matching the content in songs.json). (2 marks)
* Your Music App works with these updated APIs. (1 mark)
# Summary
My app works great by running "npm install && node db.js && npm start", if there is a error please 
1. delete node_modules & music.db
2. stop any node.js app running at prot 3000

I did all the requirements on the Checklist, you can access 

[/api/playlists]

[/api/songs]

to get the same json content in exercise 3

[/api/playlists]: http://localhost:3000/api/playlists
[/api/songs]: http://localhost:3000/api/songs