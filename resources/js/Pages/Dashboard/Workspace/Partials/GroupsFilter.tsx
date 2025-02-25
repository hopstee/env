import GroupItem from "@/Components/GroupItem";
import { Button } from "@/Components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/Components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/Components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { GroupType } from "@/types";
import { router } from "@inertiajs/react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function GroupsFilter(
    {
        items,
        selected,
    }: {
        items: GroupType[];
        selected?: GroupType;
    }
) {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()

    const [selectedItem, setSelectedItem] = useState(selected || items[0])

    const onValueChanged = (group: GroupType) => {
        router.get(group.link);
    }

    const handleSelectItem = (value: GroupType) => {
        setOpen(false);
        setSelectedItem(value);
        onValueChanged(value);
    }

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        {selectedItem.name}
                        <ChevronsUpDownIcon className="size-4" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <GroupsList
                            items={items}
                            selectedItem={selectedItem}
                            handleSelect={handleSelectItem}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-48 justify-between">
                    {selectedItem.name}
                    <ChevronDownIcon className={cn(
                        "size-4 transition-all duration-200",
                        open && "rotate-180"
                    )} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <GroupsList
                    items={items}
                    selectedItem={selectedItem}
                    handleSelect={handleSelectItem}
                />
            </PopoverContent>
        </Popover>
    )
}

function GroupsList({
    items,
    selectedItem,
    handleSelect,
}: {
    items: GroupType[];
    selectedItem: GroupType;
    handleSelect: (item: GroupType) => void;
}) {
    return (
        <Command>
            <CommandInput
                placeholder="Group"
                className="border-none h-8"
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {items.map((item, index) => (
                        <CommandItem
                            key={index}
                            value={item.name}
                            onSelect={() => {
                                handleSelect(item)
                            }}
                            className="cursor-pointer"
                        >
                            <GroupItem
                                name={item.name}
                                color={item.color}
                            />
                            <CommandShortcut>
                                {item.id == selectedItem.id && (
                                    <CheckIcon className="size-4" />
                                )}
                            </CommandShortcut>
                        </CommandItem>
                    )
                    )}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}