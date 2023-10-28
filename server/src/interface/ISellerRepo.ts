import { Seller } from "../model/seller";


interface ISellerRepo {         
    getSellers(): Promise<Seller[]>;
    saveSeller(seller:Seller):Promise<string>;
    deleteSeller(sellerId:string):Promise<void>;
    getSeller(emailId:string):Promise<Seller|null>;
    
  }

export default ISellerRepo;