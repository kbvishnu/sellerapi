// import * as express from "express";
// import {Router} from "express";
// import "reflect-metadata";

// // import ProductController from "../controller/productController";

// // const sellerRouter=function(sellerController:ProductController) :Router{
    
// //     const router = express.Router();

// //     router.use(express.json());

// //     router.get("/", async (req, res) => {
// //         sellerController.getSellers(req,res)
// //     });

// //     return router;
// // }

// // export default sellerRouter;

// // export const productRouter = express.Router();

// // productRouter.use(express.json());
 
// // productRouter.get("/", async (req, res) => {
// //     productController.getSellers(req,res)
// // });

// // productRouter.get("/:id", async (req, res) => {
// //     try {
// //         const id = req?.params?.id;
// //         const query = { _id: new mongodb.ObjectId(id) };
// //         const seller = await collections.sellers.findOne(query);
  
// //         if (seller) {
// //             res.status(200).send(seller);
// //         } else {
// //             res.status(404).send(`Failed to find an seller: ID ${id}`);
// //         }
  
// //     } catch (error) {
// //         res.status(404).send(`Failed to find an seller: ID ${req?.params?.id}`);
// //     }
// //  });

// //  productRouter.post("/", async (req, res) => {
// //     try {
// //         const seller = req.body;
// //         const result = await collections.sellers.insertOne(seller);
  
// //         if (result.acknowledged) {
// //             res.status(201).send(`Created a new seller: ID ${result.insertedId}.`);
// //         } else {
// //             res.status(500).send("Failed to create a new seller.");
// //         }
// //     } catch (error) {
// //         console.error(error);
// //         res.status(400).send(error.message);
// //     }
// //  });

// //  productRouter.put("/:id", async (req, res) => {
// //     try {
// //         const id = req?.params?.id;
// //         const seller = req.body;
// //         const query = { _id: new mongodb.ObjectId(id) };
// //         const result = await collections.sellers.updateOne(query, { $set: seller });
  
// //         if (result && result.matchedCount) {
// //             res.status(200).send(`Updated an seller: ID ${id}.`);
// //         } else if (!result.matchedCount) {
// //             res.status(404).send(`Failed to find an seller: ID ${id}`);
// //         } else {
// //             res.status(304).send(`Failed to update an seller: ID ${id}`);
// //         }
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(400).send(error.message);
// //     }
// //  });

// //  productRouter.delete("/:id", async (req, res) => {
// //     try {
// //         const id = req?.params?.id;
// //         const query = { _id: new mongodb.ObjectId(id) };
// //         const result = await collections.sellers.deleteOne(query);
  
// //         if (result && result.deletedCount) {
// //             res.status(202).send(`Removed an seller: ID ${id}`);
// //         } else if (!result) {
// //             res.status(400).send(`Failed to remove an seller: ID ${id}`);
// //         } else if (!result.deletedCount) {
// //             res.status(404).send(`Failed to find an seller: ID ${id}`);
// //         }
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(400).send(error.message);
// //     }
// //  });