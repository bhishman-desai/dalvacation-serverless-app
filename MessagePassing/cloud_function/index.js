/* CONSUMER */
const functions = require('@google-cloud/functions-framework');
const { Firestore } = require('@google-cloud/firestore');

/* Initialize Firestore client */
const firestore = new Firestore();

functions.cloudEvent('forwardComplaint', async (cloudEvent) => {
    const message = Buffer.from(cloudEvent.data.message.data, 'base64').toString();

    /* Parse the JSON message */
    const parsedMessage = JSON.parse(message);

    /* Forward to a random property agent */
    const propertyAgents = process.env.PROPERTY_AGENTS.split(',');
    const chosenAgent = propertyAgents[Math.floor(Math.random() * propertyAgents.length)];
    /* TODO: Add logic of sending a mail to the chosenAgent with parsedMessage.clientId and parsedMessage.complaint */

    /* Add a log entry to Firestore */
    try {
        await firestore.collection('complaint_logs').add({
            clientId: parsedMessage.clientId,
            agentId: chosenAgent,
            message: parsedMessage.complaint,
            timestamp: Firestore.FieldValue.serverTimestamp(),
        });
        console.log('Complaint logged successfully.');
    } catch (error) {
        console.error('Error logging complaint: ', error);
    }
});
