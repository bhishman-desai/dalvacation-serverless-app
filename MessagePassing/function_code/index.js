const functions = require('@google-cloud/functions-framework');
const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

functions.cloudEvent('forwardComplaint', async (cloudEvent) => {
    const message = Buffer.from(cloudEvent.data.message.data, 'base64').toString();
    const collectionRef = firestore.collection('complaint_logs');

    /* Log the message in Firestore */
    await collectionRef.add({ message, timestamp: Firestore.FieldValue.serverTimestamp() });

    /* Forward to a random property agent */
    const propertyAgents = process.env.PROPERTY_AGENTS.split(',');
    const chosenAgent = propertyAgents[Math.floor(Math.random() * propertyAgents.length)];

    /* Example of forwarding the complaint to the chosen agent */
    console.log(`Forwarding complaint to ${chosenAgent}`);
    console.log(`Message is: ${message}`);
});
