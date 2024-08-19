# DALVacationHome Serverless Project

Welcome to the DALVacationHome serverless project! This application is designed to manage vacation home bookings, providing functionalities for three types of users: Guests, Registered Customers, and Property Agents (super users/admin users).

## Table of Contents

1. [Introduction](#introduction)
2. [Application Users](#application-users)
    - [Guest Users](#guest-users)
    - [Registered Customers](#registered-customers)
    - [Property Agents](#property-agents)
3. [Architecture](#architecture)
4. [Modules](#modules)
    - [User Management & Authentication](#user-management--authentication)
    - [Virtual Assistant](#virtual-assistant)
    - [Message Passing](#message-passing)
    - [Notifications](#notifications)
    - [Data Analysis & Visualization](#data-analysis--visualization)
    - [Web Application Building and Deployment](#web-application-building-and-deployment)
5. [Testing](#testing)

## Introduction

The DALVacationHome application provides a robust and scalable solution for managing vacation home bookings. It utilizes a serverless architecture, leveraging AWS and GCP services to ensure high availability and reliability.

## Application Users

### Guest Users

- Check availability and tariffs of different rooms
- Use the virtual assistant for basic navigation information
- View feedback and sentiment for rooms

### Registered Customers

- All functionalities available to Guest Users
- Receive notification upon registration completion
- Access the system using multi-factor authentication (password, Q&A, Caesar cipher)
- Receive notification upon successful sign-in
- Reserve rooms for specific periods
- Use the virtual assistant for site navigation, booking information, and support
- Provide feedback on their stay

### Property Agents

- All functionalities available to Guest Users
- Receive notification upon registration completion
- Access the system using multi-factor authentication (password, Q&A, Caesar cipher)
- Receive notification upon successful sign-in
- Add/update room details, features, prices, and discount codes
- Use the virtual assistant for site navigation and booking information
- Communicate with customers asynchronously or synchronously

## Architecture

This application is built using a serverless architecture, employing various AWS and GCP services:

- **User Management & Authentication**: AWS Cognito, DynamoDB, AWS Lambda
- **Virtual Assistant**: AWS Lex, DynamoDB, AWS Lambda
- **Message Passing**: GCP Pub/Sub, DynamoDB, Firestore
- **Notifications**: AWS SNS, AWS SQS
- **Data Analysis & Visualization**: Google Natural Language API, LookerStudio, DynamoDB, GCP Storage
- **Web Application Deployment**: React, GCP CloudRun, CloudFormation, GCP Cloud Deployment Manager

![system architecture](SystemArchitecture.png "System Architecture")

## Modules

### User Management & Authentication

- **Sign Up & Multi-Factor Authentication**
    - User registration through a lightweight front-end application
    - Store user details in DynamoDB
    - 1st factor: User ID/Password (AWS Cognito)
    - 2nd factor: Question/Answer (DynamoDB + AWS Lambda)
    - 3rd factor: Caesar cipher (AWS Lambda + DynamoDB)

**Login and Multi-Factor Authentication**

![Login](Report/Images/Login.png "Login Page")
![MFA Step 1](Report/Images/MFA1.png "MFA Step 1")
![MFA Step 2](Report/Images/MFA2.png "MFA Step 2")
![MFA Step 3](Report/Images/MFA3.png "MFA Step 3")

### Virtual Assistant

- **Online Virtual Assistance**
    - Respond to queries using AWS Lex, DynamoDB, and AWS Lambda
    - Support site navigation, room details retrieval, and customer-agent communication

**Virtual Assistant Interaction**

![Bot Interaction 1](Report/Images/Bot1.png "Bot Interaction 1")
![Bot Interaction 2](Report/Images/Bot2.png "Bot Interaction 2")
![Bot Interaction 3](Report/Images/Bot3.png "Bot Interaction 3")
![Bot Interaction 4](Report/Images/Bot4.png "Bot Interaction 4")
![Bot Interaction 5](Report/Images/Bot5.png "Bot Interaction 5")
![Bot Interaction 6](Report/Images/Bot6.png "Bot Interaction 6")
![Bot Interaction 7](Report/Images/Bot7.png "Bot Interaction 7")
![Bot Interaction 8](Report/Images/Bot8.png "Bot Interaction 8")
![Bot Interaction 9](Report/Images/Bot9.png "Bot Interaction 9")

### Message Passing

- **Inter-Party Communication**
    - Use GCP Pub/Sub for message passing
    - Log communication in DynamoDB or Firestore

### Notifications

- **User Notifications**
    - Send notifications using AWS SNS and AWS SQS
    - Handle registration, login, booking confirmations, and failures

**Notification Module**

![Notification 1](Report/Images/Notification1.png "Notification Example 1")
![Notification 2](Report/Images/Notification2.png "Notification Example 2")
![Notification 3](Report/Images/Notification3.png "Notification Example 3")

### Data Analysis & Visualization

- **Feedback Analysis**
    - Analyze customer feedback using Google Natural Language API
    - Display feedback and statistics in the frontend via LookerStudio

### Web Application Building and Deployment

- **Frontend Application**
    - Built with React
    - Hosted on GCP CloudRun
    - Automated deployment using CloudFormation or GCP Cloud Deployment Manager

**Dashboard Module**

![Dashboard 1](Report/Images/Dashboard1.png "Dashboard View 1")
![Dashboard 2](Report/Images/Dashboard2.png "Dashboard View 2")

## Testing

- **Validation Tests**
    - Registered users' authentication, guest users' failed login
    - Data accuracy in upload-retrieval process
    - Chatbot response for valid/invalid utterances
    - API reliability and functionality
    - Lambda/Cloud Function testing

## Deployed Link
 [Link](https://dal-vacation-service-ugufm5l7ma-uc.a.run.app/)