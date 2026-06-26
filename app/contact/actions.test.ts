import { beforeEach, describe, expect, it, vi } from 'vitest'

// The Lambda client is constructed at module load, so mock its dependencies
// before importing the action under test. `send` is shared via vi.hoisted so
// the mock factory (hoisted above imports) can reference it.
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }))

vi.mock('@vercel/functions/oidc', () => ({
  awsCredentialsProvider: () => ({}),
}))

vi.mock('@aws-sdk/client-lambda', () => ({
  LambdaClient: class {
    send = sendMock
  },
  InvokeCommand: class {
    constructor(public params: unknown) {}
  },
  InvocationType: {},
}))

import { contact } from './actions'

const payload = {
  token: 'tok',
  name: 'John',
  email: 'john@example.com',
  message: 'Hi',
}

const lambdaResponse = (body: object) => ({
  Payload: Buffer.from(JSON.stringify(body)),
})

describe('contact action', () => {
  beforeEach(() => {
    sendMock.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('reports success when the Lambda returns statusCode 200', async () => {
    sendMock.mockResolvedValue(lambdaResponse({ statusCode: 200 }))
    const result = await contact(payload)
    expect(result.success).toBe(true)
  })

  it('reports failure on a non-200 statusCode (e.g. failed Turnstile)', async () => {
    // RequestResponse resolves even for handled non-2xx returns — the action
    // must inspect the payload rather than trusting send() to throw.
    sendMock.mockResolvedValue(lambdaResponse({ statusCode: 403 }))
    const result = await contact(payload)
    expect(result.success).toBe(false)
  })

  it('reports failure when the Lambda crashes (FunctionError)', async () => {
    sendMock.mockResolvedValue({
      FunctionError: 'Unhandled',
      Payload: Buffer.from(JSON.stringify({ errorMessage: 'boom' })),
    })
    const result = await contact(payload)
    expect(result.success).toBe(false)
  })

  it('reports failure when the invocation itself rejects', async () => {
    sendMock.mockRejectedValue(new Error('network'))
    const result = await contact(payload)
    expect(result.success).toBe(false)
  })
})
