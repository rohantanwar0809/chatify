import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
import prisma from "./prisma";

/*
 * Kafka Config
 */
const kafka = new Kafka({
  brokers: ["kafka-4665103-rohantanwar0809-8cbf.a.aivencloud.com:20643"],
  ssl: {
    ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
  },
  sasl: {
    username: "avnadmin",
    password: "AVNS_bRRvBCl67-fEO6CjU96",
    mechanism: "plain",
  },
});

let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;
  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceMessage(message: string) {
  const producer = await createProducer();
  producer.send({
    messages: [{ key: `message-${Date.now()}`, value: message }],
    topic: "MESSAGES",
  });
  return true;
}

export async function consumeMessage() {
  const consumer = kafka.consumer({ groupId: "default" });
  await consumer.connect();
  await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });
  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      console.log("Message Consumed From Kafka Broker");
      if (!message.value) return;
      try {
        await prisma.message.create({
          data: {
            text: message.value?.toString(),
          },
        });
      } catch (error) {
        // pause consuming
        console.log("Error Consuming Message From Kafka Broker");
        pause();
        //resume after 60 seconds
        setTimeout(() => {
          console.log("Resuming Message Consumption From Kafka Broker");
          consumer.resume([
            {
              topic: "MESSAGES",
            },
          ]);
        }, 60000);
      }
    },
  });
}

export default kafka;
