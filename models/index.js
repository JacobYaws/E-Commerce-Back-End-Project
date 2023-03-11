// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Associated Product to belong to Category and link them by category_id.
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
// Associated Category as having many Products and link them by category_id. Also, on delete, the child elements will also be deleted.
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag, 
// foreignKey: 'tag_id',
}); 
  

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag,
// foreignKey: 'product_id',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
