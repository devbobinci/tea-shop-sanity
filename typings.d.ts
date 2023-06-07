type Base = {
  _createdAt: string;
  _id: number;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface Product extends Base {
  title: string;
  slug: Slug;
  mainImage: MainImage;
  extraPhotos: MainImage[];
  category: string;
  price: number;
  newPrice: number;
  body: [Block];
  description: string;
  availability: boolean;
  packageSize: [string];
  bannerImage: boolean;
  featuredProduct: boolean;
}

interface Recipe extends Base {
  title: string;
  slug: Slug;
  image: MainImage;
  author: Author;
  body: [Block];
  datePublished: string;
}

interface Post extends Base {
  title: string;
  slug: Slug;
  image: MainImage;
  description: string;
  body: [Block];
  comments: Comment[];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _ref: string;
  _type: string;
  _updatedAt: string;
}

interface CartProductItem extends Product {
  quantity: number;
}

interface ExtraPhotos {
  _type: "image";
  asset: Reference;
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface MainImage {
  _type: "image";
  asset: Reference;
}

interface Author extends Base {
  bio: Block[];
  image: MainImage;
  name: string;
  slug: Slug;
}

interface Reference {
  _ref: string;
  asset: "reference";
}
