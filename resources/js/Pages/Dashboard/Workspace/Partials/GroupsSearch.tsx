import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { router } from "@inertiajs/react";
import { ArrowRightIcon, LoaderIcon, LoaderPinwheelIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GroupSearchProps = {
    useLoading?: boolean,
    queryParam?: string;
};

export default function GroupSearch(props: GroupSearchProps) {
    const {
        useLoading = true,
        queryParam,
    } = props;
    console.log(queryParam)
    const [query, setQuery] = useState(queryParam);
    const [tempQuery, setTempQuery] = useState(queryParam);
    const [loading, setLoading] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    const handleSearch = () => {
        if (!hasChanged) return;

        setLoading(true);
        router.get(route('t.active', {...route().params}),
        { 
            query: tempQuery
        },
        {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });

        setQuery(tempQuery);
        setHasChanged(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempQuery(e.target.value);
        setHasChanged(e.target.value !== query);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && hasChanged) {
            handleSearch();
        }
    };

    const endIcon = (useLoading && loading)
        ? <LoaderIcon className="size-4 animate-spin" />
        : hasChanged && (
            <Button variant="ghost" size="sm-icon" onClick={handleSearch}>
                <ArrowRightIcon className="size-4" />
            </Button>
        )
        
    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Filter variables..."
                value={tempQuery}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="w-full md:max-w-sm"
                startIcon={<SearchIcon className="size-4" />}
                endIcon={endIcon}
            />
        </div>
    )
}