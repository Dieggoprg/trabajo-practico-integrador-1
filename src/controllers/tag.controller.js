import {ArticleModel} from "../models/article.model.js";
import {TagsModel} from "../models/tag.model.js";

export const createTag = async (req, res) => {
  try {
    const tag = await TagsModel.create(req.body);
    return res.status(201).json(tag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagsModel.findAll();
    if (tags.length === 0)
      return res.status(404).json({ message: "No existen etiquetas" });
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await TagsModel.findByPk(id, {
      include: {
        model: ArticleModel,
        as: "articles",
        through: { attributes: [] },
      },
    });
    if (!tag) return res.status(404).json({ message: "La etiqueta no existe" });
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.data;

    const tag = await TagsModel.findByPk(id);
    if (!tag) return res.status(404).json({ message: "El Tag no existe" });

    await tag.update(data);

    return res.status(200).json({ message: "usuario actualizado", tag });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await TagsModel.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ message: "La etiqueta no existe" });
    return res
      .status(200)
      .json({ message: "Etiqueta eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
