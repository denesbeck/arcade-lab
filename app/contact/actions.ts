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
    const { Payload, FunctionError } = await contactLambda.send(cmd)

    // RequestResponse resolves successfully even when the handler returns a
    // non-2xx statusCode (invalid input, failed Turnstile, SES failure), so we
    // must inspect the payload rather than relying on send() to throw.
    if (FunctionError) {
      console.error('Lambda function error:', FunctionError)
      return { success: false, message: 'Unable to send message!' }
    }

    const parsed = Payload
      ? (JSON.parse(Buffer.from(Payload).toString()) as { statusCode?: number })
      : undefined

    if (parsed?.statusCode !== 200) {
      console.error('Lambda returned non-success status:', parsed?.statusCode)
      return { success: false, message: 'Unable to send message!' }
    }

    return {
      success: true,
      message: 'Message sent successfully!',
    }
  } catch (error) {
    console.error('Error invoking Lambda:', error)
    return { success: false, message: 'Unable to send message!' }
  }
}
