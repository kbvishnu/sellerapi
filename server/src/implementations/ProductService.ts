 
import { Product } from '../model/product';
import IProductService from "../interface/IProductService";
import { injectable } from 'tsyringe';

 
import { ValidateError } from 'tsoa';
import ProductDetail from '../model/productDetail';
import axios from 'axios';


 @injectable()
export class ProductService implements IProductService{
    private productServiceEndpoint: string;  
  
    constructor () { 
      this.productServiceEndpoint = "http://localhost:5000/product";
    }
  
     async saveProduct(product:Product): Promise<string> {       
      let productId : string;    
      
      await axios.post(this.productServiceEndpoint, product)
      .then(function (response) {         
          productId=response.data as string;         
      })
      .catch(function (error) {  
         const errMsg= error?.response?.data;         
         throw new ValidateError(errMsg.details,errMsg.name);
         
      });     
       return productId;
    }    

    async deleteProduct(productId : string): Promise<void> { 

      await axios.delete(this.productServiceEndpoint+ productId)       
      .catch(function (error) {  
         const errMsg= error?.response?.data;         
         throw new ValidateError(errMsg.details,errMsg.name);
          
      });     
        
    }   
    
    async getProducts(): Promise<Product[]|null> {         

      await axios.get(this.productServiceEndpoint)
      .then(function (response) {         
        const products:Product[]= <Product[]>JSON.parse(response.data)   
        return products;      
      })
      .catch(function (error) {  
         const errMsg= error?.response?.data;         
         throw new ValidateError(errMsg.details,errMsg.name);
         
      });     
       return null;
    } 
    
 
    async getProductDetails(productId:string): Promise<ProductDetail|null> {       
             
      await axios.get(this.productServiceEndpoint+"/"+productId)
      .then(function (response) {         
        const details:ProductDetail[]= <ProductDetail[]>JSON.parse(response.data)    ;
        return details;       
      })
      .catch(function (error) {  
         const errMsg= error?.response?.data;         
         throw new ValidateError(errMsg.details,errMsg.name);
         
      });     
       return null;
    }  
}