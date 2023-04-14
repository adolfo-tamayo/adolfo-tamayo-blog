import { Session } from "next-auth"

type SessionInfoProps = {
    session: Session,
    signOutCallback: () => void
}

const SessionInfo = ({session, signOutCallback}: SessionInfoProps) => {
  return (
    <div className="px-3 py-2 flex text-xs leading-snug">
        <ul className="flex flex-row list-none ml-auto">
            <li className="nav-item mr-4">
                Welcome, {session.user?.name}
            </li>
            <li className="nav-item">
                <a href="#" onClick={signOutCallback}>Sign out</a>
            </li>
        </ul>
        
    </div>
  )
}

export default SessionInfo

