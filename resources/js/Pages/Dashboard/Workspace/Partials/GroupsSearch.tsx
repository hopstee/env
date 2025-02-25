import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useDebounce } from "@/utils/debounce";
import { ArrowRightIcon, LoaderIcon, LoaderPinwheelIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GroupSearchProps = {
    useLoading?: boolean,
    onSearch: (value: string | undefined) => void;
    query?: string;
};

export default function GroupSearch(props: GroupSearchProps) {
    const {
        useLoading = true,
        onSearch,
        query,
    } = props;

    const [inputValue, setInputValue] = useState(query);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        setLoading(true);
        onSearch(inputValue);
        setLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const endIcon = (
        <Button variant="ghost" size="sm-icon" onClick={handleSearch}>
            <ArrowRightIcon className="size-4" />
        </Button>
    )

    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Filter variables..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full md:max-w-sm"
                startIcon={<SearchIcon className="size-4" />}
                endIcon={endIcon}
            />
        </div>
    )
}