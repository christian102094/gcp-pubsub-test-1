const { PubSub } = require("@google-cloud/pubsub");

async function quickstart(
  projectId = "test-globant-1", // Your Google Cloud Platform project ID
  topicNameOrId = "post_topic", // Name for the new topic to create
  subscriptionName = "post_topic-sub2" // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({ projectId });

  // get sub
  const subscription = pubsub.subscription(subscriptionName);

  // Receive callbacks for new messages on the subscription
  subscription.on("message", (message) => {
    console.log("Received message:", JSON.stringify(message.data.toString()));
    // message.ack();
    // process.exit(0);
  });

  // Receive callbacks for errors on the subscription
  subscription.on("error", (error) => {
    console.error("Received error:", error);
    process.exit(1);
  });
}

quickstart();
