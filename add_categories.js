const fs = require('fs');
let data = fs.readFileSync('src/data/mockUsers.js', 'utf8');
data = data.replace(
  "level: 'Advanced'", 
  "level: 'Advanced', category: 'Programming'"
).replace(
  "level: 'Advanced'", 
  "level: 'Advanced', category: 'Design'"
).replace(
  "level: 'Intermediate'", 
  "level: 'Intermediate', category: 'AI'"
).replace(
  "level: 'Advanced'", 
  "level: 'Advanced', category: 'Marketing'"
).replace(
  "level: 'Advanced'", 
  "level: 'Advanced', category: 'Programming'"
).replace(
  "level: 'Intermediate'", 
  "level: 'Intermediate', category: 'AI'"
).replace(
  "level: 'Intermediate'", 
  "level: 'Intermediate', category: 'Programming'"
).replace(
  "level: 'Beginner'", 
  "level: 'Beginner', category: 'Design'"
).replace(
  "level: 'Advanced'", 
  "level: 'Advanced', category: 'Programming'"
).replace(
  "level: 'Intermediate'", 
  "level: 'Intermediate', category: 'AI'"
).replace(
  "level: 'Beginner'", 
  "level: 'Beginner', category: 'Programming'"
).replace(
  "level: 'Advanced'", 
  "level: 'Advanced', category: 'Programming'"
).replace(
  "level: 'Intermediate'", 
  "level: 'Intermediate', category: 'Design'"
).replace(
  "level: 'Advanced'", 
  "level: 'Advanced', category: 'Languages'"
).replace(
  "level: 'Intermediate'", 
  "level: 'Intermediate', category: 'Finance'"
);
fs.writeFileSync('src/data/mockUsers.js', data);
