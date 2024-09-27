export interface Payment {
    id?: number;
    cardHolderName: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    amount: number;
}
