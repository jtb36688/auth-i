const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const session = require("express-session");
// const closedroutes = require('./closedroutes.js')
const KnexSessionStore = require('connect-session-knex')(session)

const db = require("./data/user-model.js");
const dbConfig = require("./data/dbConfig.js")

const server = express();
const sessionConfig = {
  name: "doggo",
  secret: "woofbarkwoof",
  cookie: {
    maxAge: 1000 * 60 * 15, //value in milliseconds, 15 minutes
    secure: false //use over https only?
  },
  httpOnly: true, // cannot acces the cookie from js using document.cookie
  resave: false,
  saveUninitialized: false, // GDPR laws against setting cookies automatically,
  store: new KnexSessionStore({
    knex: dbConfig,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60, // value in milliseconds, 60 minutes
  })
};



server.use(express.json());
// server.use("/api/restricted", restricted, closedroutes)
server.use(cors({ credentials: true, origin: true }));
server.use("/api/restricted", restricted);
server.use(session(sessionConfig));

server.post("/api/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  db.add(user)
    .then(saved => {
      req.session.user = saved;
      res.status(201).json(saved);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.get("/api/checkauth", (req, res) => {
  if (req.session && req.session.user) {
    res.send(true)
  }
  else {
    res.send(false)
  }
})

server.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    db.findBy({ username })
      .first()
      .then(user => {
        // check that passwords match
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user;
          res
            .status(200)
            .json({
              message: `Welcome ${user.username}, providing cookie now.`
            });
        } else {
          res.status(401).json({ message: "Login Error" });
        }
      })
      .catch(({ code, message }) => {
        console.log(code, message)
      });
  }
});

server.get("/api/users", restricted, (req, res) => {
  db.get()
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.get('/api/logout', (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.send(
          'you can checkout any time you like, but you can never leave....'
        );
      } else {
        res.send('bye, thanks for playing');
      }
    });
  } else {
    res.end();
  }
});

// function restricted(req, res, next) {
//   const { username, password } = req.headers;

//   if (username && password) {
//     db.findBy({ username })
//       .first()
//       .then(user => {
//         // check that passwords match
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "You shall not pass!" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
//   }
// }

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "No session Found" });
  }
}



server.get("/api/restricted/check", (req, res) => {
  res.send(`You're Logged in! You sent ${JSON.stringify(req.body)}`);
});

// This works as long as the server.use comes before the route handler to the
// related route.

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
