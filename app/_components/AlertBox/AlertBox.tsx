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
    (event: Event) => {
      const alertEventDetail = (event as CustomEvent<IAlertPayload>).detail
      setAlerts((prev) => {
        // Check for duplicates using the current state
        if (prev.find((alert) => alert.id === alertEventDetail.id)) return prev
        return [alertEventDetail, ...prev].slice(0, maxAlert)
      })
    },
    [maxAlert]
  )

  const handleCloseAlert = useCallback((event: Event) => {
    const alertEventDetail = (event as CustomEvent<IAlertPayload>).detail
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
    const prefix = context.length ? context + '/' : ''
    window.addEventListener(`${prefix}alert-event`, handleAlert)
    window.addEventListener(`${prefix}close-alert`, handleCloseAlert)
    window.addEventListener(`${prefix}purge-alerts`, handlePurgeAlerts)
    return () => {
      window.removeEventListener(`${prefix}alert-event`, handleAlert)
      window.removeEventListener(`${prefix}close-alert`, handleCloseAlert)
      window.removeEventListener(`${prefix}purge-alerts`, handlePurgeAlerts)
    }
  }, [context, handleAlert, handleCloseAlert, handlePurgeAlerts])

  return (
    <Portal>
      <div className="fixed top-2 right-2 z-999 flex w-max flex-col space-y-2">
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
