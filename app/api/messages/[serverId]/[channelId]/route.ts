import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request, { params }: { params: { serverId: string; channelId: string } }) {
  const { serverId, channelId } = params;

  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('chats');

    const messages = await collection
      .find({ serverId, channelId })
      .sort({ timestamp: 1 })
      .toArray();

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.error();
  }
}
