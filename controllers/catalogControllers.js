const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const showClothesCatalog = async (req, res) => {
  try {
    const clothes = await prisma.catalog.findMany({
      where: { published: true },
      orderBy: { id: "asc" },
    });

    const formattedPoduct = clothes.map((clothes) => ({
      ...clothes,
      formattedPrice: clothes.price.toLocaleString("id-ID"),
    }));
    res.render("index", { clothes: formattedPoduct });
  } catch (err) {
    res.status(500).send("Gagal mengambil data katalog" + err);
  }
};
const getClothesBySlug = async (req, res) => {
  const { slug } = req.params;

  const slugRegex = /^[a-z\-]+$/;
  if (!slugRegex.test(slug)) {
    return res.redirect("/404");
  }

  try {
    const item = await prisma.catalog.findUnique({
      where: { slug },
    });

    if (!item) {
      return res.redirect("/404");
    }
    const formattedProduct = {
      ...item,
      formattedPrice: item.price.toLocaleString("id-ID"),
    };

    const related = await prisma.catalog.findMany({
      where: { published: true },
      orderBy: { id: "asc" },
      take: 4,
    });
    const formattedRelated = related.map((related) => ({
      ...related,
      formattedPrice: related.price.toLocaleString("id-ID"),
    }));

    res.render("detail", { item: formattedProduct, related: formattedRelated });
  } catch (err) {
    res.status(500).send("Gagal mengambil produk" + err);
  }
};

const getForCatalog = async (req, res) => {
  try {
    const clothes = await prisma.catalog.findMany({
      where: { published: true },
      orderBy: { id: "asc" },
    });

    const formattedProduct = clothes.map((clothes) => ({
      ...clothes,
      formattedPrice: clothes.price.toLocaleString("id-ID"),
    }));

    res.render("catalog", { clothes: formattedProduct });
  } catch (err) {
    console.log(err);
    return res.redirect("/404");
  }
};

const getForOffers = async (req, res) => {
  try {
    const clothes = await prisma.catalog.findMany({
      where: { published: true },
      orderBy: { id: "asc" },
    });

    const formattedPoduct = clothes.map((clothes) => ({
      ...clothes,
      formattedPrice: clothes.price.toLocaleString("id-ID"),
    }));

    res.render("offers", { clothes: formattedPoduct });
  } catch (err) {
    console.log(err);
    return res.redirect("/404");
  }
};

module.exports = {
  showClothesCatalog,
  getClothesBySlug,
  getForCatalog,
  getForOffers,
};
