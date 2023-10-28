
import { Mock, It, Times } from "moq.ts";
import { describe, expect,it } from '@jest/globals';

import ISellerRepo from '../src/interface/ISellerRepo';
import ISellerService from '../src/interface/ISellerService'
import { Seller } from '../src/model/seller';
import SellerController from '../src/controller/SellerController';
import {SellerService} from '../src/implementations/SellerService';
import IProductService from "../src/interface/IProductService";
import ProductDetail from "../src/model/productDetail";
import { Product } from "../src/model/product";
import Bid from "../src/model/bid";
import { FieldErrors, ValidateError } from "tsoa";



const arrangeProduct=():Product=>{
  const product : Product={
    name:"DaVinchi",
    shortDescription:"The Last Supper",
    detailedDescription:"The Last Supper and Its secrets by Robert Langdon",
    category:"Painting",
    startingPrice:100,
    bidEndDate: new Date("2023-04-01")
  };        
  return product;

}

const arrangeSellers=():Seller=>{
  const seller = { 
    address:"E12, Richmond Street",
    city:"London",
    email:"primeseller-london@sellers.com",
    firstName:"Prime",
    lastName:"Seller",
    phone:"1234567890",
    pin:"WB12 JX2",
    state:"London",
    product:arrangeProduct()
  };
  return seller;

}

describe('Validate seller', () => {
 
 
  const mockSellerRepo= new Mock<ISellerRepo>();      
  const mockSellerObject=mockSellerRepo.object();  

  const mockProductService= new Mock<IProductService>();      
  const mockProductServiceObject=mockProductService.object();  

  const sellerService:ISellerService= new SellerService(mockSellerObject,mockProductServiceObject);
  const sellerController= new SellerController(sellerService);

  it(`When seller first name is empty`, async() => {
  
    const sellerFN=arrangeSellers();
    sellerFN.firstName="";   
     
    try {
      
      await sellerController.saveSeller(sellerFN);
    } catch(e) {          
      expect(e.message).toMatch("Firstname should follow min 5 to max 30 chars");
    }
  }),
  it(`When seller last name is empty`, async() => {
  
    const sellerLN=arrangeSellers();
    sellerLN.lastName="";   
   
    try {
      
      await sellerController.saveSeller(sellerLN);
    } catch(e) {          
      expect(e.message).toMatch("Lastname should follow min 5 to max 30 chars");
    }
  }),
  it(`When seller phone got more than 10 numbers`, async() => {
  
    const sellerP1=arrangeSellers();
    sellerP1.phone="78923491289";   
    
    try {
      
      await sellerController.saveSeller(sellerP1);
    } catch(e) {          
      expect(e.message).toMatch("Phone number should be 10 digits");
    }
  }),
  it(`When seller has no phone`, async() => {
  
    const sellerP2=arrangeSellers();
    sellerP2.phone="";   
   
    try {
      
      await sellerController.saveSeller(sellerP2);
    } catch(e) {          
      expect(e.message).toMatch("Phone should be not null");
    }
  }),
  it(`When seller has no phone`, async() => {
  
    const sellerP3=arrangeSellers();
    sellerP3.phone="AB";   
    
    try {
      
      await sellerController.saveSeller(sellerP3);
    } catch(e) {          
      expect(e.message).toMatch("Phone number should be 10 digits");
    }
  }),
  it(`When seller has no email`, async() => {
  
    const sellerP4=arrangeSellers();
    sellerP4.email="abcd";
    
    try {
      
      await sellerController.saveSeller(sellerP4);
    } catch(e) {          
      expect(e.message).toMatch("Email should follow standard format");
    }
  })

});


describe('Get seller', () => {   
      
  it(`Returns List of sellers `, async () => {
           
    const seller= arrangeSellers();
        

    const sellers=  [seller];
    
    const mockSellerRepo=  
    new Mock<ISellerRepo>()    
    .setup(async instance => instance.getSellers()).returnsAsync(sellers);

    const mockSellerObject=mockSellerRepo.object();   

    const mockProductService= new Mock<IProductService>();      
    const mockProductServiceObject=mockProductService.object();  
  
    const sellerService:ISellerService= new SellerService(mockSellerObject,mockProductServiceObject);
    const sellerController= new SellerController(sellerService);   

    const actual = await sellerController.getSellers();

    expect(actual).toBe(sellers);
    mockSellerRepo.verify(instance=>instance.getSellers,Times.Once());         
    
    })
         
});

describe('Save seller', () => {
  
  it(`Returns seller id`, async () => {
              
    const seller =  arrangeSellers();   

    const mockSellerRepo=  
    new Mock<ISellerRepo>()    
    .setup(async instance => instance.saveSeller(It.IsAny<Seller>())).returnsAsync("sellerId")
    .setup(async instance => instance.getSeller(It.IsAny<string>())).returnsAsync(null)
    .setup(async instance => instance.deleteSeller(It.IsAny<string>())).returnsAsync();

    const mockSellerObject=mockSellerRepo.object();   


    const mockProductService= new Mock<IProductService>()
     .setup(async instance => instance.saveProduct(It.IsAny<Product>())).returnsAsync("productId");    
  const mockProductServiceObject=mockProductService.object();  

  const sellerService:ISellerService= new SellerService(mockSellerObject,mockProductServiceObject);
          
  const sellerController= new SellerController(sellerService);

    const actual = await sellerController.saveSeller(seller);

    expect(actual).toBe("productId");
    mockSellerRepo.verify(instance=>instance.saveSeller,Times.Once());         
    
    })
  
  });


  describe('Product', () => {   
      
    it(`GetAllProducts `, async () => {
             
      const product= arrangeProduct();
          
  
      const products=  [product];
      
      const mockSellerRepo=  new Mock<ISellerRepo>() ;   
      const mockSellerObject=mockSellerRepo.object();   
  
      const mockProductService= new Mock<IProductService>()
      .setup(   instance => instance.getProducts()).returnsAsync(products);
      const mockProductServiceObject=mockProductService.object();  
    
      const sellerService:ISellerService= new SellerService(mockSellerObject,mockProductServiceObject);
      const sellerController= new SellerController(sellerService);   
  
      const actual = await sellerController.getProduct();
  
      expect(actual).toBe(products);
      mockProductService.verify(instance=>instance.getProducts,Times.Once());         
      
      });

      it(`GetAllProducts -Product service throws error`, async () => {
             
              
        const mockSellerRepo=  new Mock<ISellerRepo>() ;   
        const mockSellerObject=mockSellerRepo.object();   

    
      const fieldErrors:FieldErrors={
         name : {message :"ProductServiceError"}
      };

        const validateError:ValidateError={
          fields:fieldErrors,
          message: "ProductServiceError",
          name:"Error",
          status:500
        };
    
        const mockProductService= new Mock<IProductService>()
        .setup(  instance => instance.getProducts()).throwsAsync(validateError);
        const mockProductServiceObject=mockProductService.object();  
      
        const sellerService:ISellerService= new SellerService(mockSellerObject,mockProductServiceObject);
        const sellerController= new SellerController(sellerService);           
    
         expect( sellerController.getProduct()).rejects.toEqual(validateError); 

      });

      // it(`DeleteProduct `, async () => {
        
      //   const mockSellerRepo=  new Mock<ISellerRepo>() ;   
      //   const mockSellerObject=mockSellerRepo.object();   

    
      // const fieldErrors:FieldErrors={
      //    name : {message :"ProductServiceError"}
      // };

      //   const validateError:ValidateError={
      //     fields:fieldErrors,
      //     message: "ProductServiceError",
      //     name:"Error",
      //     status:500
      //   };
    
      //   const mockProductService= new Mock<IProductService>()
      //   .setup( instance => instance.getProducts()).throwsAsync(validateError);
      //   const mockProductServiceObject=mockProductService.object();  
      
      //   const sellerService:ISellerService= new SellerService(mockSellerObject,mockProductServiceObject);
      //   const sellerController= new SellerController(sellerService);   

      //   expect( sellerController.deleteProduct("test")).rejects.toEqual(validateError); 
        
      //   });

      
        it(`GetProductDetails `, async () => {
             
          const mockSellerRepo=  new Mock<ISellerRepo>() ;   
          const mockSellerObject=mockSellerRepo.object();   
  
      
        const fieldErrors:FieldErrors={
           name : {message :"ProductServiceError"}
        };
  
          const validateError:ValidateError={
            fields:fieldErrors,
            message: "ProductServiceError",
            name:"Error",
            status:500
          };
      
          const mockProductService= new Mock<IProductService>()
          .setup( async instance => instance.getProducts()).throwsAsync(validateError);
          const mockProductServiceObject=mockProductService.object();  
        
          const sellerService:ISellerService= new SellerService(mockSellerObject,mockProductServiceObject);
          const sellerController= new SellerController(sellerService);   
      
          expect( sellerController.getProductBids("123")).rejects.toEqual(validateError); 
           
                 
          
          });
           
  });


 
 
    