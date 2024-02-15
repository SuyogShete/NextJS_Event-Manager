import { MongoClient } from "mongodb";


export async function POST(req : Request) {

  const data = await req.json();
  const userEmail = data.email;

  if (!userEmail || !userEmail.includes('@'))
  {
    return Response.json({message : "Invalid Email"}, {status : 422});
  }

  const client = await MongoClient.connect('mongodb+srv://suyogshete04:suyog9552@cluster0.1lzgqzo.mongodb.net/')

  const db = client.db('NextEvents');

  await db.collection('Emails').insertOne({userEmail : userEmail});

  client.close();

  return Response.json({ message: `User with email ${userEmail} successfully created`}, {status : 201});
}