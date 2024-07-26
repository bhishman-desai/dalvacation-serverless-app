const functions = require('@google-cloud/functions-framework');
const {v1, PubSub} = require('@google-cloud/pubsub');

const pubClient = new PubSub();
const subClient = new v1.SubscriberClient();

functions.http('chatFunctionImproved', async (req, res) => {
    if (req.method === 'POST') {
        const {id, complaint} = req.body;

        if (!id || !complaint) {
            res.status(400).send('Invalid request payload. Both id and complaint are required.');
            return;
        }

        const topicName = `client-${id}`;
        const data = Buffer.from(JSON.stringify({complaint}));

        try {
            /* Create a topic with the name provided in the 'id' field if it doesn't exist */
            await pubClient.createTopic(topicName).catch((err) => {
                if (err.code !== 6) { /* 6 means already exists */
                    throw err;
                }
            });

            /* Grant pubsub.admin access to allUsers */
            const topic = pubClient.topic(topicName);
            const [policy] = await topic.iam.getPolicy();
            policy.bindings.push({
                role: 'roles/pubsub.publisher',
                members: ['allUsers']
            });
            await topic.iam.setPolicy(policy);

            /* Create a subscription to the topic */
            await pubClient
                .topic(topicName)
                .createSubscription(`client-${id}-pull`);

            /* Publish the complaint to the topic */
            const messageId = await topic.publishMessage({data: data});
            res.status(200).send(`Message ${messageId} published to topic ${topicName}.`);
        } catch (error) {
            res.status(500).send(`Error publishing message: ${error.message}`);
        }
    } else if (req.method === 'GET') {
        const clientId = req.query.id;

        if (!clientId) {
            res.status(400).send('Client id is required as a query parameter.');
            return;
        }

        const formattedSubscription = `projects/serverless-426417/subscriptions/client-${clientId}-pull`;

        try {
            /* The maximum number of messages returned for this request. */
            const request = {
                subscription: formattedSubscription,
                maxMessages: 10,
            };

            /* The subscriber pulls a specified number of messages. */
            const [response] = await subClient.pull(request);

            /* Process the messages and then store them. */
            const ackIds = [];
            const messageData = [];
            for (const message of response.receivedMessages || []) {
                if (message.ackId) {
                    let parsedData = JSON.parse(message.message.data.toString());
                    messageData.push(parsedData);
                    ackIds.push(message.ackId);
                }
            }

            if (ackIds.length !== 0) {
                /* Acknowledge all of the messages. */
                const ackRequest = {
                    subscription: formattedSubscription,
                    ackIds: ackIds,
                };

                await subClient.acknowledge(ackRequest);
            }

            res.status(200).json({message: messageData.length === 0 ? ['No messages'] : messageData});
        } catch (error) {
            res.status(500).send(`Error pulling messages: ${error.message}`);
        }
    } else {
        res.status(405).send('Method not allowed');
    }
});
