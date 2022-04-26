module.exports=(sequelize, dataTypes)=>{
    let alias='Products';
    let cols={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        name: {
            type: dataTypes.STRING

        },
        description: {
            type: dataTypes.STRING

        }, 
        price: {
            type: dataTypes.INTEGER

        }, 
        img: {
            type: dataTypes.STRING

        }, 
        id_category:{
            type: dataTypes.INTEGER,
            foreingKey: true

        }
    };
    let config = {
        tableName:'products',
        timestamps:false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.CategoryProducts,{
            as:'category_product',
            foreignKey: 'id_category'
        })
    }
    return Product
}