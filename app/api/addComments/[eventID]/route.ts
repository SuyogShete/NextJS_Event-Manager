import { MongoClient } from "mongodb";

export async function POST(
    req: Request,
    { params }: { params: { eventID: string } }
  ) {
    const client = await MongoClient.connect('mongodb+srv://suyogshete04:suyog9552@cluster0.1lzgqzo.mongodb.net/');

    const eventID = params.eventID;
  
    const data = await req.json();
  
    const { userEmail, userName, commentText } = data;
  
    if (
      !userEmail ||
      !userEmail.includes("@") ||
      !userName ||
      userName.trim() === "" ||
      !commentText ||
      commentText.trim() === ""
    ) {
      return Response.json({ message: "Invalid Input" }, { status: 422 });
    }

    const comment = {
      eventID : eventID,
      userEmail : userEmail,
      userName : userName,
      commentText : commentText
    }

    const db = client.db('NextEvents');

    await db.collection('Comments').insertOne(comment);

    client.close();
  
    return Response.json(
      {
        message: "Comment Added Successfully",
        comment: { eventID, userEmail, userName, commentText },
      },
      { status: 201 }
    );
  }