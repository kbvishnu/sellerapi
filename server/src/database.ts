import * as mongodb from "mongodb";
import { Seller } from "./model/seller";
 
export const collections: {
   sellers?: mongodb.Collection<Seller>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("");
   await applySchemaValidation(db);
 
   const sellersCollection = db.collection<Seller>("sellers");
   collections.sellers = sellersCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["firstName", "lastName", "phone","email"],
           additionalProperties: true,
           properties: {
               _id: {},
               firstName: {
                   bsonType: "string",
                   description: "'first name' is required and is a string",
                   minLength: 5,
                   maxLength:30
               },
               lastName: {
                   bsonType: "string",
                   description: "'last name' is required and is a string",
                   minLength: 5,
                   maxLength:30
               },
               email: {
                   bsonType: "string",
                   description: "'email' is required"
                    
               },
               phone: {
                bsonType: "string",
                description: "'phone' is required"                 
            }
           },
       },
   };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "sellers",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("sellers", {validator: jsonSchema});
       }
   });
}