const { Kafka } = require("kafkajs");

createTopic();

async function createTopic() {
  try {
    // Admin Stuff..
    const kafka = new Kafka({
      clientId: "kafka_pub_sub_client",
      brokers: ["192.168.8.148:9092"],
    });

    const admin = kafka.admin();
    console.log("Kafka Broker'a baglaniliyor...");
    await admin.connect();
    console.log("Kafka Broker'a baglanti basarili, Topic uretilecek..");
    await admin.createTopics({
      topics: [
        {
          topic: "raw_video_topic",
          numPartitions: 1,
        },
      ],
    });

    console.log("Topic basarili bir sekilde olusturulmustur...");
    await admin.disconnect();
  } catch (error) {
    console.log("Bir hata olustu", error);
  } finally {
    process.exit(0);
  }
}
