import json
import os
from google.cloud import pubsub_v1

# Set the environment variable within the Lambda function
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./path-to-service-account-key.json"

project_id = 'serverless-426417'
topic_id = 'complaint-topic'

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_id)

def lambda_handler(event, context):
    """Lambda function to publish message to Pub/Sub."""
    message = event.get('message')

    if not message:
        return {
            'statusCode': 400,
            'body': json.dumps('Message not provided.')
        }

    data = message.encode('utf-8')
    try:
        future = publisher.publish(topic_path, data)
        message_id = future.result()
        return {
            'statusCode': 200,
            'body': json.dumps(f'Message {message_id} published.')
        }
    except Exception as e:
        print(f'Error publishing message: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps('Error publishing message.')
        }
