# Clan Chat

## Chat-server--> https://github.com/Ankur1493/clan_chat_worker

Clan-Chat is a Discord-like application inspired by a YouTube tutorial on
creating a Discord clone using Next.js. Initially, the tutorial utilized
Socket.IO and LiveKit for core functionalities. However, I decided to
challenge myself by implementing WebSockets and WebRTC to manage
real-time communication and live calls.

Key aspects of the project include:
- Real-Time Communication: Implemented using WebSockets for
chat functionality.
- Live Calls: Exploring WebRTC to handle video and voice
communication.
-System Architecture: Designing a multi-server setup to manage
different aspects of the application:
  * WebRTC Server: For handling live calls.
  * WebSockets Server: For managing real-time chat.
  * Next.js Application: Handling authentication and user flow.

Currently, I am working on the Next.js application for the main site and
simultaneously learning about WebRTC and system design to effectively
integrate these technologies into a cohesive application.
