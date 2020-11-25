import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors());

app.use((req, res, next) => {
  req.me = users[1];
   next()
})

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};
 
let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};



app.get('/', (req, res) => {
  return res.send('Hello, Laverne!');
})

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
 
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.get('/users', (req, res) => {
  return res.send(Object.values(users));
})

app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
})

app.get('/messages', (req, res) => {
  return res.send(Object.values(messages));
});
 
app.get('/messages/:messageId', (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.get('/users', (req, res) => {
  return res.send('GET HTTP method on user resource');
})

app.get('/session', (req, res) => {
  return res.send(users[req.me.id]);
})

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
})

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  }

  messages[id] = message;
  
  return res.send(message);
})

app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
  )
})

app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method onuser/${req.params.userId} resource`,
  )
})

app.put('/users', (req, res) => {
  return res.send('PUT HTTP method on user resource');
})

app.delete('/users', (req, res) => {
  return res.send('DELETE HTTP method on user resource');
})

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = messages;

  messages = otherMessages
  return res.send(message);
})

app.listen(3000, () => 
  console.log(`Hello to Laverne on Port ${process.env.PORT}!`)
)