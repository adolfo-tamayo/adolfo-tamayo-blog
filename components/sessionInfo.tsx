import { Session } from "next-auth"

type SessionInfoProps = {
    session: Session,
    signOutCallback: () => void
}

const SessionInfo = ({session, signOutCallback}: SessionInfoProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      {session.user?.name ? (
        <span className="max-w-48 truncate">{session.user.name}</span>
      ) : null}
      <button
        type="button"
        onClick={signOutCallback}
        className="cursor-pointer rounded-md border border-border px-3 py-2 text-foreground transition-colors hover:bg-muted"
      >
        Sign out
      </button>
    </div>
  )
}

export default SessionInfo
