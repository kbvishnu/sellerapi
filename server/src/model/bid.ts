export default interface Bid {
    productId: string;
    sellerId: string;
    buyerId:string; 
    buyerEmail:string;
    bidAmount:number;
    requestedDate:Date;    
    buyerFullName:string;
 }
