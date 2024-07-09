/* CONSUMER */
const functions = require('@google-cloud/functions-framework');

/* Initialize Firestore client */
const admin = require('firebase-admin');
const serviceAccount = require("./serverless-426417-cf96236756bb.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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
        await admin.firestore().collection('complaint_logs').add({
            clientId: parsedMessage.clientId,
            agentId: chosenAgent,
            message: parsedMessage.complaint,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log('Complaint logged successfully.');
    } catch (error) {
        if (error.code === 5) {
            console.error('NOT_FOUND error: The specified collection or document does not exist.');
        } else {
            console.error('Error logging complaint: ', error);
        }
    }
});
