
import ProductDetail from "../model/productDetail";
import { Product } from "../model/product";
import { Seller } from "../model/seller";
 

interface ISellerService {          
    getSellers(): Promise<Seller[]>;
    getSeller(emailId:string) : Promise<Seller|null>;
    saveSeller(seller:Seller):Promise<string>;

    getProducts():Promise<Product[]>;
    deleteProduct(productId:string):Promise<void>;
    getProductDetails(productId:string):Promise<ProductDetail>;
    
  }

export default ISellerService;