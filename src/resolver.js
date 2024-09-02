const mongoose = require("mongoose");

const product = require("./mongo_schema/product");
const Product = mongoose.model("products", product);

function areObjectsEqual(objA, objB) {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    const valA = objA[key];
    const valB = objB[key];

    if (typeof valA === 'object' && typeof valB === 'object') {
      if (!areObjectsEqual(valA, valB)) {
        return false;
      }
    } else if (valA !== valB) {
      return false;
    }
  }
  return true;
}

// const { Product } = require('./model');
const { ObjectId } = require('mongodb');

const { getMinMaxPrice, getCategoryTree, getFamilyTree, isSaleProduct } = require('./helpers/index');

const resolvers = {
  Query: {
    products: async (root, args, ctx, info) => {
      const { db } = ctx;
      const productsData = await db.collection('products').find().toArray();
      const productCategoriesData = await db.collection('categories').find().toArray();


      // let demoData = await Product.find();
      let products = productsData.map(product => {
        return { ...product, price: getMinMaxPrice(product) }
      });
      let tree = [], parentTree = [];
      if (args.category) {
        const category = productCategoriesData.find(cat => cat.slug === args.category);
        category && (tree = getCategoryTree(productCategoriesData, [category]));
        category && (parentTree = getFamilyTree(productCategoriesData, category));
      }

      products = products.filter(item => {
        let flag = true;

        if (args.search) {
          flag = item.name.toLowerCase().includes(args.search.toLowerCase());
        }

        if (flag && args.category) {
          flag = item.categories.find(cat => tree.find(findCat => findCat.slug === cat.slug))
        }

        if (flag && args.tag) {
          flag = item.tags && item.tags.find(tag => tag.slug === args.tag);
        }

        if (flag && (args.colors.length || args.sizes.length)) {
          flag = item.variants.find(variant =>
            (!args.colors.length || (variant.color && args.colors.find(color => color === variant.color.name))) &&
            (!args.sizes.length || (variant.size && args.sizes.find(size => size === variant.size.size)))
          );
        }

        if (flag && args.brands.length) {
          flag = item.brands && item.brands.find(brand => args.brands.find(slug => slug === brand.slug));
        }

        if (flag && args.min_price !== null && args.max_price !== null) {
          flag = item.price[0] >= args.min_price && item.price[0] <= args.max_price;
        }

        if (flag && args.ratings.length) {
          flag = args.ratings && args.ratings.find(rating => rating === item.ratings);
        }

        return flag;
      });

      switch (args.sortBy) {
        case 'popularity':
          products = products.sort((a, b) => b.sale_count - a.sale_count);
          break;
        case 'rating':
          products = products.sort((a, b) => b.ratings - a.ratings);
          break;
        case 'price':
          products = products.sort((a, b) => a.price[0] - b.price[0]);
          break;
        case 'price-desc':
          products = products.sort((a, b) => b.price[0] - a.price[0]);
          break;
        case 'date':
        case 'default':
        default:
          break;
      }

      return {
        data: products.slice(args.from, args.to),
        total: products.length,
        categoryFamily: parentTree
      }
    },

    product: async (root, args, ctx, info) => {
      const { db } = ctx;
      const productsData = await db.collection('products').find().toArray();
      const productCategoriesData = await db.collection('Categories').find().toArray();

      const products = productsData.map(product => {
        return { ...product, price: getMinMaxPrice(product) }
      });
      const product = products.find(product => product.slug === args.slug);

      if (args.onlyData) {
        return { data: product };
      } else {
        const categoryTree = getCategoryTree(productCategoriesData, product.categories);
        const relatedProducts = products.filter(item => {
          return item.categories.find(cat => categoryTree.find(findCat => findCat.slug === cat.slug))
        });
        const index = relatedProducts.findIndex(item => item.slug === product.slug);
        return {
          data: product,
          prev: index > 0 ? relatedProducts[index - 1] : null,
          next: index < relatedProducts.length - 1 ? relatedProducts[index + 1] : null,
          related: relatedProducts.filter(item => item.slug !== product.slug).slice(0, 3)
        };
      }
    },

    specialProducts: async (root, args, ctx, info) => {
      const { db } = ctx;
      const productsData = await db.collection('products').find().toArray();

      const products = productsData.map(product => {
        return { ...product, price: getMinMaxPrice(product) }
      });
      let results = {};
      args.featured &&
        (results = { ...results, featured: products.filter(item => item.is_hot).slice(0, args.count) });
      args.bestSelling &&
        (results = { ...results, bestSelling: products.sort((itemA, itemB) => itemB.sale_count - itemA.sale_count).slice(0, args.count) });
      args.topRated &&
        (results = { ...results, topRated: products.sort((itemA, itemB) => itemA.ratings > itemB.ratings).slice(0, args.count) })
      args.latest &&
        (results = { ...results, latest: products.filter(item => item.is_new).slice(0, args.count) });
      args.onSale &&
        (results = { ...results, onSale: products.filter(item => isSaleProduct(item)).slice(0, args.count) })
      return results;
    },

    dealProducts: async (root, args, ctx, info) => {
      const { db } = ctx;
      const productsData = await db.collection('products').find().toArray();

      const products = productsData.map(product => {
        return { ...product, price: getMinMaxPrice(product) }
      });
      return products.filter(product => product.until).slice(0, args.count);
    },

    shopSidebarData: async (root, args, ctx, info) => {
      const { db } = ctx;
      const productsData = await db.collection('products').find().toArray();
      const productCategoriesData = await db.collection('categories').find().toArray();

      const categories = productCategoriesData.sort((a, b) => a.name < b.name ? -1 : 1);
      const products = productsData.map(product => {
        return { ...product, price: getMinMaxPrice(product) }
      });
      let results = {};
      results.categories = categories.map(category => {
        let tree = getCategoryTree(categories, [category]);
        return {
          ...category,
          count: products.filter(
            product => product.categories.find(findCat => tree.find(cat => cat.slug === findCat.slug))
          ).length
        }
      });
      if (args.featured) {
        results.featured = products.filter(item => item.is_hot).slice(0, 3);
      }
      return results;
    },

    posts: async (root, args, ctx, info) => {
      const { db } = ctx;
      const postsData = await db.collection('posts').find().toArray();

      let posts = postsData;
      if (args.category) {
        posts = posts.filter(post => post.categories.find(cat => cat.slug === args.category));
      }
      return {
        data: posts.slice(args.from, args.to),
        total: posts.length
      };
    },

    post: async (root, args, ctx, info) => {
      const { db } = ctx;
      const postsData = await db.collection('posts').find().toArray();

      let post = postsData.find(post => post.slug === args.slug);
      let related = postsData.filter(
        item => item.slug !== post.slug && item.categories.find(cat => post.categories.find(findCat => findCat.slug === cat.slug))
      )
      return {
        data: post,
        related: related.slice(0, 4)
      };
    },

    postSidebarData: async (root, args, ctx, info) => {
      const { db } = ctx;
      const postsData = await db.collection('posts').find().toArray();
      const postCategoriesData = await db.collection('categories').find().toArray();

      const postCategories = postCategoriesData;
      const recentPosts = postsData.sort((a, b) => new Date(a.date) > new Date(b.date)).slice(0, 2);

      return {
        categories: postCategories,
        recent: recentPosts
      }
    },
    
    imageConfigs: async (root, args, ctx, info) => {
      const { db } = ctx;
      const { file_names } = args;
      
      const fileNames = file_names.split(',');
      
      const query = fileNames.length > 0 ? { file_name: { $in: fileNames } } : {}
      const data = await db.collection('imageconfigs').find(query).toArray();
      
      const mappedData = data.map((item) => ({
        id: item._id,
        file_name: item.file_name,
        file_url: item.file_url,
      }));
      
      return mappedData;
    }
  },
};

module.exports = resolvers;
