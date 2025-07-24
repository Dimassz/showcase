const { Catalog, User } = require('../models');

function parseArray(input) {
  if (Array.isArray(input)) return input;
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

const showClothesCatalog = async (req, res) => {
  try {
    const clothes = await Catalog.findAll({
      where: { published: true },
      order: [["id", "ASC"]], // Perbaikan dari orderBy menjadi order
    });

    const formattedProduct = clothes.map((item) => {
      const data = item.toJSON();

      let picture = [];
      try {
        if (typeof data.picture === "string") {
          picture = JSON.parse(data.picture);
        } else if (Array.isArray(data.picture)) {
          picture = data.picture;
        }
      } catch (err) {
        picture = [];
      }

      return {
        ...data,
        picture,
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

  const slugRegex = /^[a-z\-]+$/;
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

    const product = item.toJSON(); // ubah ke plain object

    const formattedProduct = {
      ...product,
      picture: Array.isArray(product.picture) ? product.picture : [],
      details: parseArray(product.details),
       size: parseArray(product.size),
      formattedPrice: product.price.toLocaleString("id-ID"),
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
        picture: Array.isArray(relatedItem.picture) ? relatedItem.picture : [],
        formattedPrice: relatedItem.price.toLocaleString("id-ID"),
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
        picture: Array.isArray(product.picture) ? product.picture : [],
        formattedPrice: product.price.toLocaleString("id-ID"),
      };
    });

    res.render("Catalog", { clothes: formattedProduct });
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
        picture: Array.isArray(product.picture) ? product.picture : [],
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
