import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { Input } from "@/components/ui/input";
import { emojiData } from "@/constants/emoji";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Label } from "@/Components/ui/label";

interface IProjectEmojiSelect {
    onSelect: (emoji: string) => void;
    selected: string;
}

interface EmojiData {
    [category: string]: {
        emoji: string;
        keywords: string[];
    }[];
}

export function EmojiSelect({ onSelect, selected }: IProjectEmojiSelect) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEmojiData = Object.entries(emojiData).reduce((acc, [category, emojis]) => {
        const filteredEmojis = emojis.filter((emojiObj) =>
            emojiObj.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        if (filteredEmojis.length > 0) {
            acc[category] = filteredEmojis;
        }
        return acc;
    }, {} as EmojiData);

    return (
        <div className="space-y-1">
            <Label>
                Select icon
            </Label>

            <div className="space-y-3">
                <div className="flex space-x-3">
                    <div className="size-10 min-w-10 border rounded-md flex items-center justify-center">
                        {selected}
                    </div>
                    <Input
                        placeholder="Search for emojis..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                    />
                </div>

                <ScrollArea className="h-64 border rounded-md">
                    {Object.entries(filteredEmojiData).map(([category, emojis]) => (
                        <div key={category} className="mb-4 p-4">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">{category}</h3>

                            <div className="flex flex-wrap gap-2 justify-between">
                                {emojis.map((emojiObj, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        className="w-10 h-10 p-0"
                                        onClick={() => onSelect(emojiObj.emoji)}
                                        type="button"
                                    >
                                        <span className="text-xl">{emojiObj.emoji}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
        </div>
    );
};

export default EmojiSelect;
