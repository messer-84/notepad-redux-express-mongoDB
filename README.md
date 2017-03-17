# This is a React-Redux-Node-MongoDB Full Stack Application


![alt tag](https://media.giphy.com/media/xUA7b6JV54IadgcFIQ/giphy.gif)


## Install
### Step 1: setup client
   - Go to /notepad
   - npm install  ( wait it done )
   - npm start ( start client )
   
### Step 2: setup server
  - Go to /notepad/server
  - npm install ( wait it done )
  - npm start ( start server )
  
### Step 3: See result
  - Open broswer
  - go to localhost:3000
 

   
## This application is meet follow requiements
### Add a note 
- POST /note/add

### Get notes, optionally specifying GET parameters where:
- limit - indicating the maximum number of notes to get; if unspecified it gets all notes
- order - specifies what order to sort the notes, based on creation time which can be either "asc" or "desc"; if unspecified, defaults to descending
- start - specifies where in the sorted notes to begin getting notes; if unspecified, defaults to 1
- limit - specified the maximum number of notes to get
- GET /note?limit=10&start=1&order=asc

### View a note with a given id
- GET /note/:id

### Update a note with a given id
- PUT /note/:id

### Delete a note with a given id
- DELETE /note/:id

## That's it. Enjoy
