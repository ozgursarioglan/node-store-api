const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const Playlist = require("./models/playlist");

const Artist = require("./models/artist");
const Album = require("./models/album");
const Invoice = require("./models/invoice");
const InvoiceItem = require("./models/invoiceitem");
const Customer = require("./models/customer");
const User = require("./models/user");

const Energy = require("./models/energy");

const Slasher = require("./models/slasher");

const moment = require("moment");
var DateDiff = require('date-diff');

const app = express();
const PORT = 3020;

app.use(bodyParser.json());

const sequelize = require("./database/sequelize");
const { Op } = require("sequelize");

//Cors Configuration
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

Artist.hasMany(Album, {
  foreignKey: "ArtistId"
});
Album.belongsTo(Artist, {
  foreignKey: "ArtistId"
});

Invoice.belongsTo(Customer, {
  foreignKey: "CustomerId"
});

Customer.hasMany(Invoice, {
  foreignKey: "CustomerId"
});

Invoice.hasMany(InvoiceItem, {
  foreignKey: "InvoiceId"
});

InvoiceItem.belongsTo(Invoice, {
  foreignKey: "InvoiceId"
});

app.get("/api/energy/:start_date/:end_date", (req, res) => {
let { start_date, end_date } = req.params;
  Energy.findAll({
    attributes: [
      [sequelize.fn("MIN", sequelize.col("creation_datetime")), "start_date"],
      [sequelize.fn("MAX", sequelize.col("creation_datetime")), "end_date"],
      [sequelize.fn("SUM", sequelize.col("power")), "power_sum"],
      [sequelize.fn("COUNT", sequelize.col("power")), "power_count"],
      [sequelize.fn("SUM", sequelize.col("power_kw")), "power_kw_sum"]
    ],    
    where: {
      creation_datetime: {
        [Op.gte]: start_date,
        [Op.lte]: end_date
      }
    }
    
  }).then(energy => {
    res.json(energy);
  });
});

app.get("/api/invoices", (req, res) => {
    Invoice.findAll({ include: [Customer, InvoiceItem] }).then(invoice => {
      res.json(invoice);
    });
  });



  app.get("/api/slasher/:IhzarPartiNo", (req, res) => {
    let { IhzarPartiNo } = req.params;
    Slasher.findAll({ where: { IhzarPartiNo: IhzarPartiNo } }).then(parti => {
      if (parti) {
        res.json(parti);
      } else {
        res.status(404).send();
      }
    });
  });


app.get("/api/energy_yedek", (req, res) => {
  Energy.findAll({
    where: {
      creation_datetime: {
        [Op.gt]: new Date("2020-01-01 17:00"),
        [Op.lte]: new Date("2020-01-10 14:00")
      }
    }
  }).then(energy => {
    res.json(energy);
  });
});

//Customers GET
app.get("/api/users", (req, res) => {
  User.findAll().then(user => {
    res.json(user);
  });
});

app.get("/api/users", (req, res) => {
  User.findAll().then(user => {
    res.json(user);
  });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    User.create({ username, password: hash }).then(user => {
      res.json(user);
    });
  });
});

//Customers GET
app.get("/api/customer", (req, res) => {
  Customer.findAll().then(customer => {
    res.json(customer);
  });
});
//Customer Invoices GET
app.get("/api/cusInvoices/:customerId", (req, res) => {
  let { customerId } = req.params;
  Invoice.findAll({ where: { customerId: customerId } }).then(cusInvoice => {
    if (cusInvoice) {
      res.json(cusInvoice);
    } else {
      res.status(404).send();
    }
  });
});

//Invoice GET
app.get("/api/invoices", (req, res) => {
  Invoice.findAll({ include: [Customer, InvoiceItem] }).then(invoice => {
    res.json(invoice);
  });
});

// Invoice GET Invoice ID
app.get("/api/invoices/:InvoiceId", (req, res) => {
  let { InvoiceId } = req.params;
  Invoice.findByPk(InvoiceId, { include: [Customer, InvoiceItem] }).then(
    invoice => {
      if (invoice) {
        res.json(invoice);
      } else {
        res.status(404).send();
      }
    }
  );
});
//Invoice POST
app.post("/api/invoices", (req, res) => {
  console.log(req);
  Invoice.create(req.body, { include: [InvoiceItem] }).then(invoice => {
    res.json(invoice);
  });
});

app.get("/api/artists", (req, res) => {
  Artist.findAll().then(artist => {
    res.json(artist);
  });
});
app.post("/api/artists/", (req, res) => {
  Artist.create({
    name: req.body.name
  }).then(artist => {
    res.json(artist);
  });
});

app.get("/api/artists/:id", (req, res) => {
  let { id } = req.params;
  Artist.findByPk(id, { include: [Album] }).then(artist => {
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send();
    }
  });
});

app.get("/api/playlists", (req, res) => {
  Playlist.findAll().then(playlist => {
    res.json(playlist);
  });
});
app.get("/api/playlists/:id", (req, res) => {
  let { id } = req.params;
  Playlist.findByPk(id).then(playlist => {
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).send();
    }
  });
});

app.get("/api/albums", (req, res) => {
  Album.findAll().then(album => {
    res.json(album);
  });
});

app.listen(PORT, () => {
  console.log("Express Api Listening: " + PORT);
});

sequelize.sync().then(() => {
  console.log("Connection to Database Successful");
});
