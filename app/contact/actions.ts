"use server";
import AWS from "aws-sdk";
import { InvocationRequest } from "aws-sdk/clients/lambda";

const AWS_REGION = process.env.AWS_REGION;
const CONTACT_LAMBDA = process.env.CONTACT_LAMBDA;

const contactLambda = new AWS.Lambda({
  region: AWS_REGION,
});

interface IContactPayload {
  token: string;
  name: string;
  email: string;
  message: string;
}

export async function contact(payload: IContactPayload) {
  const params = {
    FunctionName: CONTACT_LAMBDA,
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
