import { Panel } from '@/_components'
import { YEARS } from '@/_config/stats'
import { BIO } from '../_config/data'

const Biography = () => {
  return (
    <Panel title="Lore" meta={`${YEARS} year run`}>
      <div className="w-full leading-relaxed">{BIO}</div>
    </Panel>
  )
}

export default Biography
