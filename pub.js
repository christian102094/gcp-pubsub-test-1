const { PubSub } = require("@google-cloud/pubsub");

async function quickstart(
  projectId = "test-globant-1", // Your Google Cloud Platform project ID
  topicNameOrId = "post_topic", // Name for the new topic to create
  subscriptionName = "post_topic-sub" // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({ projectId });

  // // Creates a new topic
  // const [topic] = await pubsub.createTopic(topicNameOrId);
  // console.log(`Topic ${topic.name} created.`);

  // // Creates a subscription on that new topic
  // const [subscription] = await topic.createSubscription(subscriptionName);

  // // Receive callbacks for new messages on the subscription
  // subscription.on("message", (message) => {
  //   console.log("Received message:", message.data.toString());
  //   process.exit(0);
  // });

  // // Receive callbacks for errors on the subscription
  // subscription.on("error", (error) => {
  //   console.error("Received error:", error);
  //   process.exit(1);
  // });
  // get topic with batch options
  const topic = pubsub.topic(topicNameOrId, {
    batching: {
      maxMessages: 1,
      maxMilliseconds: 100000,
    },
  });

  // Send a message to the topic
  // topic.publish(Buffer.from(`Test message! ${Date.now()}`));

  // loop each 3 seconds
  setInterval(() => {
    const date = Date.now();
    console.log("Sending... ", date);

    topic.publish(Buffer.from(`Test message! ${date}`));
  }, 2000);
}

quickstart();
