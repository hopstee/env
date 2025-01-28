import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { IBreadcrumb, PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

export default function WorkspaceBreadcrumb() {
    const { breadcrumbs } = usePage<PageProps>().props;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb: IBreadcrumb, index: number) => {
                    const showSeparator = index !== breadcrumbs.length - 1;

                    return [
                        <BreadcrumbItem key={`item-${index}`}>
                            <BreadcrumbPage>
                                {breadcrumb.url
                                    ? <Link
                                        href={breadcrumb.url}
                                        className="transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                                    >
                                        {breadcrumb.name}
                                    </Link>
                                    : breadcrumb.name
                                }
                            </BreadcrumbPage>
                        </BreadcrumbItem>,
                        showSeparator && <BreadcrumbSeparator key={`separator-${index}`} />
                    ]
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}