module.exports=(sequelize, dataTypes)=>{

    let alias="CategoryProducts";

    let cols={
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName:'category_products',
        timestamps:false
    }

    const CategoryProduct=sequelize.define(alias, cols, config)

    CategoryProduct.associate = function(models){
        CategoryProduct.hasMany(models.Products,{
            as:'products',
            foreignKey: 'id_category'
        })
    }
    return CategoryProduct
}