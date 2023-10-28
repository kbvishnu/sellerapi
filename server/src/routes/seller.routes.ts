import * as express from "express";
import SellerController from "../controller/SellerController";
import { Router } from "express";
import  ValidationError  from "../exception/ValidationError";


const sellerRouter=function(sellerController:SellerController) :Router{
    
    const router = express.Router();

    router.use(express.json());

    
    router.get("/Sellers", async (req,res) => {         
        const sellers= sellerController.getSellers();
        res.statusCode=200;
        res.json({ sellers });
    });

    router.get("/Seller", async (req,res) => {         
        const sellers= sellerController.getSellers();
        res.statusCode=200;
        res.json({ sellers });
    });

    router.post("/", async (req,res) => { 
        try{
            const seller = req.body;        
            const sellerId= await sellerController.saveSeller(seller);
            res.statusCode=201;
            res.json({ sellerId });
        }
        catch(e){
            
            if (e instanceof ValidationError) 
            {
                
                res.statusCode=422; 
            }
            else{
                res.statusCode=500;               
                
            }
            res.json(e.message);
        }
        return res;
    });

    return router;
}

export default sellerRouter;

 
 


// sellerRouter.get("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const seller = await collections.sellers.findOne(query);
  
//         if (seller) {
//             res.status(200).send(seller);
//         } else {
//             res.status(404).send(`Failed to find an seller: ID ${id}`);
//         }
  
//     } catch (error) {
//         res.status(404).send(`Failed to find an seller: ID ${req?.params?.id}`);
//     }
//  });

//  sellerRouter.post("/", async (req, res) => {
//     try {
//         const seller = req.body;
//         const result = await collections.sellers.insertOne(seller);
  
//         if (result.acknowledged) {
//             res.status(201).send(`Created a new seller: ID ${result.insertedId}.`);
//         } else {
//             res.status(500).send("Failed to create a new seller.");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(400).send(error.message);
//     }
//  });

//  sellerRouter.put("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const seller = req.body;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const result = await collections.sellers.updateOne(query, { $set: seller });
  
//         if (result && result.matchedCount) {
//             res.status(200).send(`Updated an seller: ID ${id}.`);
//         } else if (!result.matchedCount) {
//             res.status(404).send(`Failed to find an seller: ID ${id}`);
//         } else {
//             res.status(304).send(`Failed to update an seller: ID ${id}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
//  });

//  sellerRouter.delete("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const result = await collections.sellers.deleteOne(query);
  
//         if (result && result.deletedCount) {
//             res.status(202).send(`Removed an seller: ID ${id}`);
//         } else if (!result) {
//             res.status(400).send(`Failed to remove an seller: ID ${id}`);
//         } else if (!result.deletedCount) {
//             res.status(404).send(`Failed to find an seller: ID ${id}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
//  });