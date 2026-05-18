import Link from "next/link"
import { ArrowUpRight, CheckCircle2, CircleDashed, Clock3 } from "lucide-react"

import { cn } from "@/lib/utils"

type AvailableToolWidgetProps = {
    name: string,
    description: string,
    link?: string
    status?: "Live" | "Draft" | "Future" | "Available"
}

const statusStyles = {
    Live: {
        icon: CheckCircle2,
        className: "border-foreground bg-foreground text-background",
    },
    Draft: {
        icon: Clock3,
        className: "border-accent bg-accent/10 text-foreground",
    },
    Future: {
        icon: CircleDashed,
        className: "border-border bg-muted/45 text-muted-foreground",
    },
    Available: {
        icon: CircleDashed,
        className: "border-border bg-background text-muted-foreground",
    },
}

const AvailableToolWidget = ({name, description, link, status = "Available"}: AvailableToolWidgetProps) => {
    const statusStyle = statusStyles[status]
    const StatusIcon = statusStyle.icon

    const content = (
        <>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium", statusStyle.className)}>
                        <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {status}
                    </span>
                    <h2 className="mt-3 text-2xl font-semibold">{name}</h2>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border transition-colors group-hover:border-foreground">
                    {link ? (
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    ) : (
                        <CircleDashed className="h-4 w-4" aria-hidden="true" />
                    )}
                </span>
            </div>
            <p className="max-w-md leading-7 text-muted-foreground">
                {description}
            </p>
        </>
    )

    if (!link) {
        return (
            <article className="grid gap-8 rounded-lg border border-border bg-background/45 p-5 sm:p-6">
                {content}
            </article>
        )
    }

    return (
        <Link
            href={link}
            className="group grid gap-8 rounded-lg border border-border bg-background/70 p-5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:p-6"
        >
            {content}
        </Link>
    )
}
export default AvailableToolWidget
