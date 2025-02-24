import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/Components/ui/button"
import { InertiaLinkProps, Link } from "@inertiajs/react"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("flex justify-center", className)}
        {...props}
    />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
    isActive?: boolean
    href?: string | null
}
    // & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "onClick">
    & Omit<InertiaLinkProps, "onProgress" | "onSuccess" | "onError" | "data" | "href">
    & Pick<ButtonProps, "size">

const PaginationLink = ({
    className,
    isActive,
    children,
    href,
    size = "icon",
    ...props
}: PaginationLinkProps) => {
    const classes = cn(
        buttonVariants({
            variant: isActive ? "outline" : "ghost",
            size,
        }),
        className
    )
    console.log(href);
    if (href) {
        return (
            <Link
                aria-current={isActive ? "page" : undefined}
                className={classes}
                href={href}
                {...props}
            >
                {children}
            </Link>
        )
    }

    return (
        <Button
            className={classes}
            type="button"
            variant={isActive ? "outline" : "ghost"}
            {...(props as ButtonProps)}
        >
            {children}
        </Button >
    )
}
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        className={className}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Prev page</span>
    </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        className={className}
        {...props}
    >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
    </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to first page"
        className={className}
        {...props}
    >
        <ChevronsLeft className="h-4 w-4" />
        <span className="sr-only">First page</span>
    </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationLast = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to last page"
        className={className}
        {...props}
    >
        <ChevronsRight className="h-4 w-4" />
        <span className="sr-only">Last page</span>
    </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationFirst,
    PaginationLast,
}
