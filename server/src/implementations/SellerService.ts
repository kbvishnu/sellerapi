import {injectable, inject} from "tsyringe";
import ISellerRepo  from "../interface/ISellerRepo";
import { Seller } from "../model/seller";
import ISellerService from "../interface/ISellerService";
import IProductService from "../interface/IProductService";
import ValidationError from "../exception/ValidationError";
import { Product } from "../model/product";
import productDetail from "../model/productDetail";



@injectable()
export class SellerService implements ISellerService{
    private sellerRepo: ISellerRepo;  
    private productService: IProductService  
  
    constructor (@inject("ISellerRepo")sellerRepo: ISellerRepo, 
    @inject("IProductService")productService: IProductService) { 
      this.sellerRepo = sellerRepo;
      this.productService= productService;
    }
  


    async getSellers(): Promise<Seller[]> {
       return await this.sellerRepo.getSellers();
    }

    async getSeller(emailId:string):Promise<Seller|null>{
        return await this.sellerRepo.getSeller(emailId);
    }

    async saveSeller(seller:Seller):Promise<string>{
      let sellerId: string;
      let deleteRequired: boolean;
      try{
        const product = seller.product;
        const sellerObj =  seller;
        sellerObj.product=null;
        
        const sellerDb= await this.sellerRepo.getSeller(seller.email);
        if(sellerDb)
          sellerId= sellerDb._id as unknown  as string ;
        else
          {
            sellerId= await this.sellerRepo.saveSeller(sellerObj);  
            deleteRequired=true;      
          }

        if(sellerId)
        {
          product.sellerId= sellerId; 
          const productId= await this.productService.saveProduct(product);
          if(productId)
            return productId;
        }
        else
           throw new ValidationError("Failed to save seller and product");
      }
      catch(error)
      {
          console.log("deleting seller");
          if(sellerId && deleteRequired)
            await this.sellerRepo.deleteSeller(sellerId);
          
          throw error;
      }
            
    }


    async getProductDetails(productId: string): Promise<productDetail> {
      return await this.productService.getProductDetails(productId);
    }

    async getProducts(): Promise<Product[]> {
      return await this.productService.getProducts();
    }

    async deleteProduct(productId: string): Promise<void> {
      return await this.productService.deleteProduct(productId);
    }

    

}