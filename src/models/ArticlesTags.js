import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import {ArticleModel} from "./article.model.js";
import {TagsModel} from "./tag.model.js";

export const ArticleTags = sequelize.define("Articles_Tags", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

ArticleModel.belongsToMany(TagsModel, {
  through: ArticleTags,
  foreignKey: "article_id",
  as: "tags",
  onDelete: "CASCADE",
});

TagsModel.belongsToMany(ArticleModel, {
  through: ArticleTags,
  foreignKey: "tag_id",
  as: "articles",
  onDelete: "CASCADE",
});
ArticleTags.belongsTo(TagsModel, {
  foreignKey: "tag_id",
  as: "tags",
  onDelete: "CASCADE",
});

ArticleTags.belongsTo(ArticleModel, {
  foreignKey: "article_id",
  as: "articles",
  onDelete: "CASCADE",
});
