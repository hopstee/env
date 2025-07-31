import { Head } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AdminAccessOnly() {
    const isMobile = useIsMobile();

    return (
        <>
            <Head title="Groups" />

            <div className="w-full h-screen flex flex-col items-center justify-center bg-background p-4">
                <div>
                    <img src="/icons/portcullis.png" className="w-48 h-48" />
                </div>
                <span className="text-center text-muted-foreground mt-3">
                    You have no access to this page. Please contact an administrator for assistance.
                </span>

                <Button
                    variant="link"
                    onClick={() => window.history.back()}
                    className="group mt-4"
                >
                    <ChevronLeft
                        className={!isMobile ? cn(
                            "scale-75 group-hover:scale-100 translate-x-1 group-hover:translate-x-0",
                            "opacity-0 group-hover:opacity-100 transition-all",
                        ) : ""}
                    />
                    Go back
                </Button>
            </div>
        </>
    );
}
