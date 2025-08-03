import { ICategory } from "./icategory";

export interface IProduct {
    sold: number;
    images: string[];
    subcategory: {
        _id: string;
        name: string;
        slug: string;
        category: string;
    }[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: ICategory;
    brand: {
        _id: string;
        name: string;
        slug: string;
        image: string;
    };
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}
