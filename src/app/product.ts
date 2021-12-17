export interface Product {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: Rating;
    title: string;
    quantity: number;
}

export interface Rating {
    rate: number;
    count: number;
}
