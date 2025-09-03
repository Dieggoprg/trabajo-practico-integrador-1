import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { TagsModel } from "./tag.model.js";
import { ArticleModel } from "./article.model.js";

export const ArticlesTags = sequelize.define("Articles_Tags", {
    id: {type: DataTypes.INTEGER,
        primaryKey:true,
         autoIncrement: true, 
         unique:true, 
         allowNull:false
    }
,
} ,{
     updatedAt:false,
     createdAt:false
   }
)

//RELACION N:M   ----  MUCHOS ARTICULOS TIENEN MUCHAS ETIQUETAS Y MUCHAS ETIQUETAS TIENEN MUCHOS ARTICULOS
ArticleModel.belongsToMany(TagsModel, {through: ArticlesTags, foreignKey: "articles_id", as: "articles"})

TagsModel.belongsToMany(ArticleModel, {through: ArticlesTags, foreignKey: "tags_id", as: "tags"})
