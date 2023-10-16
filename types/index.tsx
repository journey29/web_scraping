export type PriceHistoryItem = {
    price: number;
};

export interface Product {
    _id?: string,
    url: string,
    title: string,
    currency: string,
    imageUrl: string,
    originalPrice: string,
    lowestPrice: number,
    highestPrice: number,
    currPrice: string,
    priceHistory: PriceHistoryItem[] | [],
    description: string,
    users: string[]
}

export type NotificationType =
    | "WELCOME"
    | "CHANGE_OF_STOCK"
    | "LOWEST_PRICE"
    | "THRESHOLD_MET";

export type EmailContent = {
    subject: string;
    body: string;
};

export type EmailProductInfo = {
    title: string;
    url: string;
};