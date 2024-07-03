const functions = require('@google-cloud/functions-framework');

functions.cloudEvent('forwardComplaint', async (cloudEvent) => {
    const message = Buffer.from(cloudEvent.data.message.data, 'base64').toString();

    /* Forward to a random property agent */
    const propertyAgents = process.env.PROPERTY_AGENTS.split(',');
    const chosenAgent = propertyAgents[Math.floor(Math.random() * propertyAgents.length)];

    /* Example of forwarding the complaint to the chosen agent */
    console.log(`Forwarding complaint to ${chosenAgent}`);
    console.log(`Message is: ${message}`);
});
