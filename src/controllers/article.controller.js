import {ArticleModel} from "../models/article.model.js";
import {UserModel} from "../models/user.model.js";

export const createArticle = async (req, res) => {
  try {
    const data = req.data;

    const article = await ArticleModel.create({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      status: data.status,
      user_id: req.user.id,
    });
    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll();
    if (articles.length === 0)
      return res.status(404).json({ message: "No existen artículos" });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findByPk(id, {
      include: {
        model: UserModel,
        as: "author",
        attributes: { exclude: ["password"] },
      },
    });
    if (!article)
      return res.status(404).json({ message: "El artículo no existe" });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getArticleUserLogin = async (req, res) => {
  try {
    const articleUserLogin = await UserModel.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: {
        model: ArticleModel,
        as: "articles",
      },
    });

    return res.status(200).json(articleUserLogin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getArticleUserLoginById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findOne({
      where: {
        id: id,
        user_id: req.user.id,
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.data;
    const article = await ArticleModel.findByPk(id);
    if (!article)
      return res.status(404).json({ message: "El articulo no existe" });

    await article.update({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      status: data.status,
      user_id: req.user.id,
    });

    return res.status(200).json({ message: "Articulo actualizado", article });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ArticleModel.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ message: "El artículo no existe" });
    return res
      .status(200)
      .json({ message: "El artículo eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
