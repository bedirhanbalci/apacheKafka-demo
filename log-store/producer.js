const { Kafka } = require("kafkajs");
const log_data = require("./system_logs.json");

createProducer();

async function createProducer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_log_store_client",
      brokers: ["192.168.8.148:9092"],
    });

    const producer = kafka.producer();
    console.log("Producer'a baglaniliyor...");
    await producer.connect();
    console.log("Producer'a baglanti basarili..");

    let messages = log_data.map(item => {
      return {
        value: JSON.stringify(item),
        partition: item.type === "system" ? 0 : 1,
      };
    });

    const message_result = await producer.send({
      topic: "LogStoreTopic",
      messages: messages,
    });

    console.log("Gonderim islemi basarilidir", JSON.stringify(message_result));
    await producer.disconnect();
  } catch (error) {
    console.log("Bir hata olustu", error);
  } finally {
    process.exit(0);
  }
}
