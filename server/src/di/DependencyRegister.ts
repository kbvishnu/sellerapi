import { container, Lifecycle } from "tsyringe";
import ISellerRepo from "../interface/ISellerRepo";
import ISellerService from "../interface/ISellerService";
import {SellerRepo }from "../implementations/SellerRepo";
import {SellerService} from "../implementations/SellerService";
import SellerController from "../controller/SellerController";
import { ProductService } from "../implementations/ProductService";
import IProductService from "../interface/IProductService";
// import ProductController from "../controller/productController";



export  function registerDependencies() {
    
    
    container.register<ISellerRepo>('ISellerRepo', {useClass: SellerRepo},  
    { lifecycle: Lifecycle.Singleton } );

    container.register<IProductService>('IProductService', {useClass: ProductService},  
    { lifecycle: Lifecycle.Singleton } );

    

    container.register<ISellerService>('ISellerService', {useClass: SellerService},  
    { lifecycle: Lifecycle.Singleton } );

    

    container.registerSingleton(SellerController);
    // container.registerSingleton(ProductController);
    
    return container;
    
}


// export const sellerController=():SellerController=>{return container.resolve(SellerController)};  
// export const productController=():ProductController=>{return container.resolve(ProductController)};  