import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request, { params }: { params: { serverId: string; channelId: string } }) {
  const { serverId, channelId } = params;

  try {
    console.log("called")
    const client = await clientPromise;
    const db = client.db('test');
    console.log(`db === ${db}`)
    const collection = db.collection('chats');
    console.log(`collection === ${collection}`)

    const messages = await collection
      .find({ serverId, channelId })
      .toArray();

    console.log(messages)
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.error();
  }
}
