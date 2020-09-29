import express from 'express';

import { tutorial } from '../models/tutorial';

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("user1");
  let msg = new tutorial({
    title: "1",
    description: "1",
    published: false,
  })
    .save()
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    })
    .catch((err) => {
      console.error(err);
    });

  // res.send("respond with a resource");
});
export default router;
