"use server";
import AWS from "aws-sdk";
import { InvocationRequest } from "aws-sdk/clients/lambda";

const contactLambda = new AWS.Lambda({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

interface IContactPayload {
  token: string;
  name: string;
  email: string;
  message: string;
}

export async function contact(payload: IContactPayload) {
  const params = {
    FunctionName: process.env.CONTACT_LAMBDA,
    InvocationType: "RequestResponse",
    Payload: JSON.stringify(payload),
  };

  try {
    await contactLambda.invoke(params as InvocationRequest).promise();
    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Error invoking Lambda:", error);
    return { success: false, message: "Unable to send message!" };
  }
}
