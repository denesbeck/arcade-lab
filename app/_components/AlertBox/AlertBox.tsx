'use client'
import { Portal } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Alert } from './_components'

export type Severity = 'error' | 'warning' | 'info' | 'success'

export interface IAlertPayload {
  id: string
  title: string
  message: string
  severity: Severity
  duration?: number
  closable?: boolean
}

interface IAlertBox {
  maxAlert?: number
  context?: string
}

const AlertBox = ({ maxAlert = 5, context = '' }: IAlertBox) => {
  const [alerts, setAlerts] = useState<IAlertPayload[]>([])

  const handleAlert = useCallback(
    (event: CustomEvent) => {
      const alertEventDetail = event.detail as IAlertPayload
      setAlerts((prev) => {
        // Check for duplicates using the current state
        if (prev.find((alert) => alert.id === alertEventDetail.id)) return prev
        return [alertEventDetail, ...prev].slice(0, maxAlert)
      })
    },
    [maxAlert]
  )

  const handleCloseAlert = useCallback((event: CustomEvent) => {
    const alertEventDetail = event.detail as IAlertPayload
    setAlerts((prev) =>
      prev.filter((alert) => alert.id !== alertEventDetail.id)
    )
  }, [])

  const handlePurgeAlerts = useCallback(() => {
    setAlerts([])
  }, [])

  const closeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }, [])

  useEffect(() => {
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
    window.addEventListener(
      `${context.length ? context + '/' : ''}alert-event`,
      handleAlert
    )
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
    window.addEventListener(
      `${context.length ? context + '/' : ''}close-alert`,
      handleCloseAlert
    )
    window.addEventListener(
      `${context.length ? context + '/' : ''}purge-alerts`,
      handlePurgeAlerts
    )
    return () => {
      // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
      window.removeEventListener(
        `${context.length ? context + '/' : ''}alert-event`,
        handleAlert
      )
      // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/28357
      window.removeEventListener(
        `${context.length ? context + '/' : ''}close-alert`,
        handleCloseAlert
      )
      window.removeEventListener(
        `${context.length ? context + '/' : ''}purge-alerts`,
        handlePurgeAlerts
      )
    }
  }, [context, handleAlert, handleCloseAlert, handlePurgeAlerts])

  return (
    <Portal>
      <div className="flex fixed top-2 right-2 flex-col space-y-2 w-max z-[999]">
        {alerts.map((el) => {
          return (
            <Alert
              key={el.id}
              title={el.title}
              message={el.message}
              severity={el.severity}
              duration={el.duration}
              closable={el.closable}
              close={() => closeAlert(el.id)}
            />
          )
        })}
      </div>
    </Portal>
  )
}

export default AlertBox
