
import * as mongodb from "mongodb";
import ISellerRepo  from "../interface/ISellerRepo";
import { Seller } from "../model/seller";
import {collections} from "../database";


export class SellerRepo implements ISellerRepo{
    private sellerCollection : mongodb.Collection<Seller>;
  
    constructor () { 
      this.sellerCollection = collections.sellers;
    }


    async getSellers(): Promise<Seller[]> {
        return await this.sellerCollection.find({}).toArray();
    }

    async saveSeller(seller:Seller):Promise<string>{
      const result = await this. sellerCollection.insertOne(seller);
  
        if (result.acknowledged) 
           return result.insertedId.toString();
        
        throw new Error("Failed while trying to insert seller");          
        
    }

    async deleteSeller(sellerId:string):Promise<void>{
      await this. sellerCollection.deleteOne({sellerId:sellerId});
    }

    async getSeller(emailId:string):Promise<Seller>{
      const filter: mongodb.Filter<Seller> = {
        email:emailId
      }     
      return await this. sellerCollection.findOne(filter);
    }
}