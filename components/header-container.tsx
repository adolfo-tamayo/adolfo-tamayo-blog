import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

const HeaderContainer: FunctionComponent = ({ children }: Props) => (
  <div className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
    {children}
  </div>
)
export default HeaderContainer