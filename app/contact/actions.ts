'use server'
import {
  InvocationType,
  InvokeCommand,
  LambdaClient,
} from '@aws-sdk/client-lambda'

const contactLambda = new LambdaClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
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
