const express=require('express')
const app=express()
const PORT = 8080;

export function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();
  
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  
  return age;
}

  


let users: { name: string; dob: string ,id:any}[] = [];
app.use(express.json())

app.get('/',(req:any, res:any) => {
  res.json({message:"success",users})
})

app.get('/user/:name', (req:any, res:any) => {
  const { name } = req.params;

  const user = users.find(user => user.name === name);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const age = calculateAge(user.dob);

  res.json({ name: user.name, age });
  
});


app.post('/user', (req:any, res:any) => {
  const { name, dob } = req.body;
  if (!name || !dob) {
    return res.status(400).json({ error: 'Name and date of birth are required.' });
  }
  // const id=Date.now()

  users.push({
    name, dob,
    id: undefined
  });

  res.json({ message: 'User added successfully.' });
});


app.put('/user/:name', (req:any, res:any) => {
  const { name } = req.params;
  const { dob } = req.body;

  const userIndex = users.findIndex(user => user.name === name);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  users[userIndex].dob = dob;

  res.json({ message: 'User updated successfully.' });
});


app.delete('/user/:name', (req:any, res:any) => {
  const { name } = req.params;

  const userIndex = users.findIndex(user => user.name === name);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  users.splice(userIndex, 1);

  res.json({ message: 'User deleted successfully.' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

