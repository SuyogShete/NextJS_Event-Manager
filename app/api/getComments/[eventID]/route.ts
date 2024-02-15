import { MongoClient } from "mongodb";

export async function GET(
    req: Request,
    { params }: { params: { eventID: string } }
  ) {

    const client = await MongoClient.connect('mongodb+srv://suyogshete04:suyog9552@cluster0.1lzgqzo.mongodb.net/');

    const eventID = params.eventID;
  
    const dummyComments = [
      {
        id: "1",
        eventId : "e1",
        userName: "User1",
        commentText: "First Comment",
      },
      {
        id: "2",
        eventId : "e2",
        userName: "User2",
        commentText: "User2 first comment.",
      },
      {
        id: "3",
        eventId : "e1",
        userName: "User1",
        commentText: "Second Comment",
      },
      {
        id: "4",
        eventId : "e3",
        userName: "User3",
        commentText: "User3 First Comment",
      },
    ];
  
    // const filteredComments = dummyComments.filter(
    //   (comment) => comment.eventId === eventID
    // );

    const db = client.db('NextEvents');

    const filteredComments = await db.collection('Comments').find({eventID : eventID}).sort({_id : -1}).toArray();

    client.close();
  
    return Response.json({filteredComments : filteredComments});
  }