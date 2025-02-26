import { useEffect, useRef, useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";

type TagInputProps = Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
    tags: string[];
    onChange: (tags: string[]) => void;
    error?: string;
    setError?: (error: string) => void;
    validationCallback?: (value: string) => boolean;
};

const TagInput = ({ tags, onChange, error, setError, validationCallback, className, ...inputProps }: TagInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [focusedTagIndex, setFocusedTagIndex] = useState<number | null>(null);
    const [invalidTags, setInvalidTags] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setFocusedTagIndex(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const addTag = () => {
        const newTag = inputValue.trim();
        if (!newTag) return;

        onChange([...tags, newTag]);

        if (!validationCallback?.(newTag)) {
            setInvalidTags([...invalidTags, newTag]);
            setError?.("Some email incorrect");
        } else {
            setInvalidTags(invalidTags.filter(tag => tag !== newTag));
            if (invalidTags.length === 0) setError?.("");
        }

        setInputValue("");
        setFocusedTagIndex(null);
    };

    const removeTag = (index: number) => {
        const removedTag = tags[index];
        const newTags = tags.filter((_, i) => i !== index);
        onChange(newTags);

        if (invalidTags.includes(removedTag)) {
            const newInvalidTags = invalidTags.filter(tag => tag !== removedTag);
            setInvalidTags(newInvalidTags);
            if (newInvalidTags.length === 0) setError?.("");
        }

        setFocusedTagIndex(newTags.length > 0 ? Math.max(0, index - 1) : null);

        if (newTags.length === 0) {
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            addTag();
        }

        if (e.key === "Backspace" && inputValue === "") {
            if (focusedTagIndex !== null) {
                removeTag(focusedTagIndex);
            } else if (tags.length > 0) {
                setFocusedTagIndex(tags.length - 1);
                inputRef.current?.blur();
                wrapperRef.current?.focus();
            }
            e.preventDefault();
        }

        if (focusedTagIndex !== null) {
            if (e.key === "ArrowLeft" && focusedTagIndex > 0) {
                setFocusedTagIndex((prev) => (prev !== null ? prev - 1 : null));
                e.preventDefault();
            } else if (e.key === "ArrowRight") {
                if (focusedTagIndex < tags.length - 1) {
                    setFocusedTagIndex((prev) => (prev !== null ? prev + 1 : null));
                } else {
                    setFocusedTagIndex(null);
                    inputRef.current?.focus();
                }
                e.preventDefault();
            }
        }
    };

    return (
        <div
            ref={wrapperRef}
            className={cn(
                "flex flex-wrap gap-2 w-full rounded-md border border-input bg-background px-3 py-2 text-base",
                "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
                "placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
                "focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm cursor-text",
                focusedTagIndex !== null && "focus:ring-0 focus:ring-offset-0",
                className,
            )}
            onClick={() => {
                setFocusedTagIndex(null);
                inputRef.current?.focus();
            }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            {tags.map((tag, index) => (
                <Badge
                    key={index}
                    variant={invalidTags.includes(tag) ? "destructive" : "secondary"}
                    className={cn(
                        "flex items-center space-x-1 cursor-pointer border-secondary border-2",
                        invalidTags.includes(tag) && "border-destructive",
                        focusedTagIndex === index && "border-secondary-foreground",
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        setFocusedTagIndex(index);
                        inputRef.current?.blur();
                    }}
                >
                    <span>{tag}</span>
                    <X
                        size={14}
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTag(index);
                        }}
                    />
                </Badge>
            ))}
            <input
                ref={inputRef}
                type={inputProps.type || "text"}
                className={cn(
                    "min-h-6 flex-1 bg-background p-0",
                    "focus:ring-0 focus:ring-offset-0 border-none",
                    "placeholder:text-muted-foreground placeholder:text-sm text-sm"
                )}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setFocusedTagIndex(null);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setFocusedTagIndex(null);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                    }
                }}
                placeholder={inputProps.placeholder || "Type..."}
                autoComplete={inputProps.autoComplete || "text"}
                autoFocus={inputProps.autoFocus || false}
            />
        </div>
    );
};

export default TagInput;
