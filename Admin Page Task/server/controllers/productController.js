const Product = require("../model/product");

exports.postNewProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;

  Product.create({
    name: name,
    price: price,
  })
    .then((result) => {
      return res.json({ product: result.dataValues });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => res.json(products))
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("product deleted");
      res.redirect("http://localhost:3000");
    })
    .catch((err) => console.log(err));
};
