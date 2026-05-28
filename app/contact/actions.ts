'use server'
import {
  InvocationType,
  InvokeCommand,
  LambdaClient,
} from '@aws-sdk/client-lambda'
import { awsCredentialsProvider } from '@vercel/functions/oidc'

const contactLambda = new LambdaClient({
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN as string,
  }),
  region: process.env.AWS_REGION,
})

interface IContactPayload {
  token: string
  name: string
  email: string
  message: string
}

export async function contact(payload: IContactPayload) {
  const params = {
    FunctionName: process.env.CONTACT_LAMBDA,
    InvocationType: 'RequestResponse' as InvocationType,
    Payload: JSON.stringify(payload),
  }

  const cmd = new InvokeCommand(params)

  try {
    await contactLambda.send(cmd)
    return {
      success: true,
      message: 'Message sent successfully!',
    }
  } catch (error) {
    console.error('Error invoking Lambda:', error)
    return { success: false, message: 'Unable to send message!' }
  }
}
