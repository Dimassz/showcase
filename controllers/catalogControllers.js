const { Catalog, User } = require('../models');
const parseJsonField = require("../utils/parseJsonField");



const showClothesCatalog = async (req, res) => {
  try {
    const clothes = await Catalog.findAll({
      where: { published: true },
      order: [["id", "ASC"]], // Perbaikan dari orderBy menjadi order
    });

    const formattedProduct = clothes.map((item) => {
      const data = item.toJSON();

    return {
    ...data,
    picture: parseJsonField(data.picture),
    formattedPrice:
      typeof data.price === "number"
        ? data.price.toLocaleString("id-ID")
        : "0",
  };
    });

    res.render("index", { clothes: formattedProduct });
  } catch (err) {
    res.status(500).send("Gagal mengambil data katalog: " + err.message);
  }
};



const getClothesBySlug = async (req, res) => {
  const { slug } = req.params;

  const slugRegex = /^[A-Za-z\-]+$/;
  if (!slugRegex.test(slug)) {
    return res.redirect("/404");
  }

  try {
    const item = await Catalog.findOne({
      where: { slug },
    });

    if (!item) {
      return res.redirect("/404");
    }

    const product = item.toJSON(); 

    const formattedProduct = {
       ...product,
      picture: parseJsonField(product.picture),
      details: parseJsonField(product.details),
      size: parseJsonField(product.size),
      formattedPrice: typeof product.price === "number"
        ? product.price.toLocaleString("id-ID")
        : "0",
    };

    const related = await Catalog.findAll({
      where: { published: true },
      order: [['id', 'ASC']],
      limit: 4,
    });

    const formattedRelated = related.map((rel) => {
      const relatedItem = rel.toJSON();
      return {
         ...relatedItem,
        picture: parseJsonField(relatedItem.picture),
        formattedPrice: typeof relatedItem.price === "number"
          ? relatedItem.price.toLocaleString("id-ID")
          : "0",
      };
    });

    res.render("detail", {
      item: formattedProduct,
      related: formattedRelated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal mengambil produk: " + err.message);
  }
};

const getForCatalog = async (req, res) => {
  try {
    const clothes = await Catalog.findAll({
      where: { published: true },
      order: [['id', 'ASC']], 
    });

    const formattedProduct = clothes.map((item) => {
      const product = item.toJSON(); 
      return {
        ...product,
        picture: parseJsonField(product.picture),
        formattedPrice: product.price.toLocaleString("id-ID"),
      };
    });

    res.render("catalog", { clothes: formattedProduct });
  } catch (err) {
    console.error(err);
    return res.redirect("/404");
  }
};


const getForOffers = async (req, res) => {
  try {
    const clothes = await Catalog.findAll({
      where: { published: true },
      order: [['id', 'ASC']], // ganti orderBy ke Sequelize style
    });

    const formattedProduct = clothes.map((item) => {
      const product = item.toJSON(); // ubah ke plain object
      return {
        ...product,
        picture: parseJsonField(product.picture),
        formattedPrice: product.price.toLocaleString("id-ID"),
      };
    });

    res.render("offers", { clothes: formattedProduct });
  } catch (err) {
    console.error(err);
    return res.redirect("/404");
  }
};


module.exports = {
  showClothesCatalog,
  getClothesBySlug,
  getForCatalog,
  getForOffers,
};
