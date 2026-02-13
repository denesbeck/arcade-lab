import { useCallback } from 'react'
import { IAlertPayload } from '../AlertBox'

type AlertEventType = 'alert-event' | 'close-alert' | 'purge-alerts'

const useAlert = (context: string = '') => {
  const alert = useCallback(
    ({ id, title, message, severity, duration, closable }: IAlertPayload) => {
      if (window)
        window.dispatchEvent(
          new CustomEvent(
            `${context.length ? context + '/' : ''}alert-event` as AlertEventType,
            {
              detail: {
                id,
                title,
                message,
                severity,
                duration,
                closable,
              } as IAlertPayload,
            }
          )
        )
    },
    [context]
  )

  const closeAlert = useCallback(
    (id: string) => {
      if (window)
        window.dispatchEvent(
          new CustomEvent(
            `${context.length ? context + '/' : ''}close-alert` as AlertEventType,
            {
              detail: {
                id,
              } as IAlertPayload,
            }
          )
        )
    },
    [context]
  )

  const purgeAlerts = useCallback(() => {
    if (window)
      window.dispatchEvent(
        new CustomEvent(
          `${context.length ? context + '/' : ''}purge-alerts` as AlertEventType,
          {
            detail: {} as IAlertPayload,
          }
        )
      )
  }, [context])

  return { alert, closeAlert, purgeAlerts }
}

export default useAlert
