import { ReactChildren } from "react"

const HeaderContainer = (props) => (
    <div className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        {props.children}
    </div>
)
export default HeaderContainer