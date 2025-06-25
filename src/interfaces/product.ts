export default interface Product {
    id: number;
    documentId: string;
    name: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    picture: {
        id: number;
        name: string;
        url: string;
        alternativeText?: string;
        width: number;
        height: number;
    }[];
    localizations: any[];
}