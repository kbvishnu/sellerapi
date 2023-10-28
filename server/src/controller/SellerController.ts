
import "reflect-metadata";
import ISellerService from "../interface/ISellerService";
import {injectable, inject, singleton} from "tsyringe";
import { Seller } from "../model/seller";
import { ValidationError } from "../exception/ValidationError";
import {  Body, Delete, Get, Post, Route, SuccessResponse } from "tsoa";
import { Product } from "../model/product";
import ProductDetail from "../model/productDetail";


@singleton()
@injectable()
@Route("seller")

export class SellerController {
    private sellerService: ISellerService;  
    
    constructor (@inject("ISellerService")sellerService: ISellerService) { 
      this.sellerService = sellerService;
    }
    
  /**
   * Retrieves the list  of a sellers.
   
   */
    @Get("show-sellers")
    public async getSellers(): Promise<Array<Seller>| null>{
      return await this.sellerService.getSellers();       
    }

   /**
   * Retrieves a seller by emailId.
   
   */
    @Get("show-sellers/{emailId}")
     public async getSeller(emailId:string): Promise<Seller| null>{
      return await this.sellerService.getSeller(emailId);       
    }

    /**
      * List all products
   
   */

    @Get("show-products}")
     public async getProduct(): Promise<Product[]| null>{
      return await this.sellerService.getProducts();       
    }

    /**
      * List bids for a product
   
   */

    @Get("show-bids/{:productId}")
    public async getProductBids(productId:string): Promise<ProductDetail| null>{
      if(!productId)
        throw new ValidationError("Invalid product Id");
     return await this.sellerService.getProductDetails(productId);       
   }

    /**
      * List bids for a product
   
   */

     @Delete("delete/{:productId}")
     public async deleteProduct(productId:string): Promise<void>{
       if(!productId)
         throw new ValidationError("Invalid product Id");
      return await this.sellerService.deleteProduct(productId);       
    }

   /**
      * Saves the seller and product
   
   */
    @SuccessResponse("201", "Created") 
    @Post("add-product")
      public async saveSeller( @Body() seller:Seller): Promise<string> {
      
        const validationMsg= this.validateSeller(seller)
        if(!validationMsg)  
          return this.sellerService.saveSeller(seller);
        else
         throw new ValidationError(validationMsg);
    }   

    validateSeller= (seller: Seller):string=> {
      
      if(seller.firstName.length<5 || seller.firstName.length>30)
        return "Firstname should follow min 5 to max 30 chars";
    
      if(seller.lastName.length<5 || seller.lastName.length>30)  
        return "Lastname should follow min 5 to max 30 chars";      
      
      const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (!regexp.test(seller.email))
        return "Email should follow standard format";
  
      if(!seller.phone)
        return "Phone should be not null";      
        
      if(seller.phone.length!=10)
        return "Phone number should be 10 digits";
      
      if(isNaN(+seller.phone))
        return "Phone number be a number";
      
      return "";
    }
  }
  
  export default SellerController ;



