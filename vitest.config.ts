import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next', 'mcp-server/node_modules'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
      '@mcp': path.resolve(__dirname, 'mcp-server/src'),
    },
  },
})
