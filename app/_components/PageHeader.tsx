import { Heading1, Info } from '.'

interface IPageHeader {
  title: string
  description: string
}

const PageHeader = ({ title, description }: IPageHeader) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-2 py-4 px-2 sm:px-6 max-w-[1400px] animate-text-focus">
        <Heading1>{title}</Heading1>
        <Info>{description}</Info>
      </div>
    </div>
  )
}

export default PageHeader
