import { Server } from "socket.io";
import Redis from "ioredis";

const redisConfig = {
  host: "redis-34241017-rohantanwar0809-8cbf.a.aivencloud.com",
  port: 20630,
  password: "AVNS_VNWUKs1fdIo29sKPKy-",
  username: "default",
};
const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Socket Service Initialized");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  get io(): Server {
    return this._io;
  }

  public initListeners() {
    const io = this._io;
    console.log("Socket Listeners Initialized");
    io.on("connection", (socket) => {
      console.log("Socket Connected", socket.id);
      socket.on("message", async ({ message }: { message: string }) => {
        console.log("Socket Message", message);
        // publish message to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
      socket.on("disconnect", () => {
        console.log("Socket Disconnected");
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel !== "MESSAGES") return;
      console.log("Sub Socket Message Received", message);
      io.emit("message", JSON.parse(message));
    });
  }

  public emit(event: string, data: any) {
    this._io.emit(event, data);
  }
}

export default SocketService;
