import express from "express";
import { listings } from "./listings";
import bodyParser from "body-parser";
const app = express();
const port = 9000;

app.use(bodyParser.json());

app.get("/listings", (_req, res) => res.send(listings));

app.get("/listings/:id", (req, res) => {
  const { id } = req.params;
  const listing = listings.find((listing) => listing.id === id);
  res.send(listing ? listing : `Unable to find a listing with ID ${id}`);
});
app.post("/delete-listing", (req, res) => {
  const { id } = req.body;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings.splice(i, 1));
    }
  }

  res.send(`Failed to delete listing with id: ${id}`);
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
