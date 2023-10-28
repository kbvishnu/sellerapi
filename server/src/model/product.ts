
 
export interface Product {
   name: string;
   shortDescription: string;
   detailedDescription : string,
   category :  "Painting" | "Sculptor" | "Ornament";
   startingPrice: number;
   bidEndDate : Date;
   sellerId? : string;
}