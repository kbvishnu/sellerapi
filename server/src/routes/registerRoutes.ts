import { Application } from "express";
import sellerRouter from "../routes/seller.routes"
// import productRouter from "../routes/product.routes"
import SellerController from "../controller/SellerController";
// import ProductController from "../controller/productController";
import { container } from "tsyringe";
import { registerDependencies } from "../di/DependencyRegister";
import PingController from "../controller/PingController";
import pingRouter from "./ping.routes";

export default function registerRoutes(app: Application) {

    registerDependencies();
    
     
    app.use("/ping", pingRouter(new PingController()));

    app.use('/seller', sellerRouter(container.resolve(SellerController)));

    // app.use('/product', productRouter(container.resolve(ProductController)));

}