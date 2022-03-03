const express = require("express");
const router = express.Router();
const cmverify = require("./cmverify");
const Products = require("./models/product_schema");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");

// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.originalFilename.split(".")[1];
    doc.image = `${doc.product_id}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;

    if (fs.existsSync(newpath)) {
      await fs.remove(newpath);
    }
    await fs.move(files.image.filepath, newpath);

    // Update database
    await Products.findOneAndUpdate({ product_id: doc.product_id }, doc);
  }
};

router.get("/product",  async (req, res) => {
  let doc = await Products.find({}).sort({ created: -1 });
  res.json(doc);
});


// Add Product
router.post("/product", async (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let doc = await Products.create(fields); // insert
      await uploadImage(files, doc); // save image
      res.json({ result: "ok", message: JSON.stringify(doc) }); // reply result
    });
  } catch (err) {
    res.json({ result: "nok", message: JSON.stringify(err) });
  }
});

// Get single
router.get("/product/id/:id", async (req, res) => {
  let doc = await Products.findOne({ product_id: req.params.id });
  res.json(doc);
});

// Get product by keyword
router.get("/product/name/:keyword", async (req, res) => {
  console.log("get products by keyword");
  var query = { name: new RegExp("^.*" + req.params.keyword + ".*$", "i") };
  let doc = await Products.find(query);
  res.json(doc);
});


// Delete Product
router.delete("/product/id/:id", async (req, res) => {
  let doc = await Products.findOneAndDelete({ product_id: req.params.id });
  res.json({ result: "ok", message: JSON.stringify(doc) });
});

// Update Product
router.put("/product", (req, res) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let doc = await Products.findOneAndUpdate(
        { product_id: fields.product_id },
        fields
      );
      await uploadImage(files, fields);

      res.json({ result: "ok", message: JSON.stringify(doc) });
    });
  } catch (err) {
    res.json({ result: "nok", message: JSON.stringify(err) });
  }
});

const showHistory = (req, res) => {
  res.json(["1", "2", "3", "4"]);
};

router.get("/history/:a/:b", cmverify.verify1, cmverify.verify2, showHistory);
module.exports = router;
