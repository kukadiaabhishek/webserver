const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
	input MediaInput {
    width: Int
    height: Int
    url: String
}

input VariantInput {
    price: Float
    sale_price: Float
    size: SizeInput
    color: ColorInput
}

input SizeInput {
    name: String
    size: String
    thumb: MediaInput
}

input ColorInput {
    name: String
    color: String
    thumb: MediaInput
}

input ProductTagInput {
    name: String
    slug: ID
}

input ProductBrandInput {
    id: Int!
    name: String
    slug: ID
}

input ProductCategoryInput {
    name: String
    parent: String
    slug: ID
}


    type Product {
		_id: ID!
        id: Int!
        name: String
        slug: ID
        short_description: String
        price: [Float]
        until: String
        sku: String
        stock: String
        ratings: Float
        reviews: Int
        sale_count: Int
        is_hot: Boolean
        is_new: Boolean
        is_sale: Boolean
        is_out_of_stock: Boolean
        release_date: String
        developer: String
        publisher: String
        game_mode: String
        rated: Int
        small_pictures: [Media]
        pictures: [Media]
        large_pictures: [Media]
        brands: [ProductBrand]
        tags: [ProductTag]
        categories: [ProductCategory]
        variants: [Variant]
    }

    type Media {
        width: Int
        height: Int
        url: String
        full_url: String
    }

    type Variant {
        price: Float
        sale_price: Float
        size: Size
        color: Color
    }

    type Size {
        name: String
        size: String
        thumb: Media
    }

    type Color {
        name: String
        color: String
        thumb: Media
    }

    type ProductTag {
        id: Int!
        name: String
        slug: ID
    }

    type ProductCategory {
		_id: ID!
        id: Int!
        name: String
        parent: String
        slug: ID
    }

    type ProductCategoryResponse {
        id: Int!
        name: String
        slug: ID
        count: Int
    }

    type ProductBrand {
        id: Int!
        name: String
        slug: ID
    }

    type Post {
        id: Int!
        title: String
        slug: ID
        author: String
        date: String
        comments: Int
        content: String
        type: PostType
        picture: [Media]
        small_picture: [Media]
        video: Boolean
        categories: [PostCategory]
    }

    type PostCategory {
        id: Int!
        name: String
        slug: ID
        parent: String
        count : Int
    }

    enum PostType {
        image
        video
        gallery
    }

    type ProductSingleResponse {
        data: Product
        prev: Product
        next: Product
        related: [Product] 
    }

    type SpecialProducts {
        featured: [Product]
        bestSelling: [Product]
        topRated: [Product]
        latest: [Product]
        onSale: [Product]
    }

    type ShopSidebarResponse {
        categories: [ProductCategoryResponse],
        featured: [Product]
    }

    type ShopResponse {
        data: [Product]
        total: Int
        categoryFamily: [ProductCategory]
    }

    type PostsResponse {
        data: [Post]
        total: Int
    }

    type PostSingleResponse {
        data: Post
        related: [Post]
    }

    type PostSidebarResponse {
        categories: [PostCategory]
        recent: [Post]
    }
    
    type ImageConfigResponse {
        id: String
        file_name: String
        file_url: String
    }

    type Query {
        hello: String
        products(demo: Int! search: String, colors: [String] = [], sizes: [String] = [], brands: [String] = [], min_price: Int = null, max_price: Int = null, category: String, tag: String, ratings:[Int] = [], sortBy: String, from: Int = 0, to: Int): ShopResponse
        product(demo: Int!, slug: String!, onlyData: Boolean): ProductSingleResponse
        specialProducts(demo: Int!, featured: Boolean, bestSelling: Boolean, topRated: Boolean, latest: Boolean, onSale: Boolean, count: Int): SpecialProducts
        shopSidebarData(demo: Int!, featured: Boolean): ShopSidebarResponse
        dealProducts(demo: Int!, count: Int = 1): [Product]
        imageConfigs(file_names: String): [ImageConfigResponse]

        posts(demo: Int!, category: String, from: Int = 0, to: Int): PostsResponse
        post(demo: Int!, slug: String!): PostSingleResponse
        postSidebarData(demo: Int!): PostSidebarResponse
    }
	
	input ProductInput {
        id: Int
        name: String
        slug: ID
        short_description: String
        price: Float
        sale_price: Float
        until: String
        sku: String
        stock: String
        ratings: Float
        reviews: Int
        sale_count: Int
        is_hot: Boolean
        is_new: Boolean
        is_sale: Boolean
        is_out_of_stock: Boolean
        release_date: String
        developer: String
        publisher: String
        game_mode: String
        rated: Int
        small_pictures: [MediaInput]
        pictures: [MediaInput]
        large_pictures: [MediaInput]
        brands: [ProductBrandInput]
        tags: [ProductTagInput]
        categories: [ProductCategoryInput]
        variants: [VariantInput]
    }

    # Define other types as you have done previously

    type Mutation {
        createProduct(input: ProductInput!): Product
        updateProduct(_id: ID!, input: ProductInput!): Product
        deleteProduct(id: ID!): Boolean

        createProductCategory(input: ProductCategoryInput!): ProductCategory
        updateProductCategory(_id: ID!, input: ProductCategoryInput!): ProductCategory
        deleteProductCategory(id: ID!): Boolean
    }

	
`

module.exports = typeDefs;
