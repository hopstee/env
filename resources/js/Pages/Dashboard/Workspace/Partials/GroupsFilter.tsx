import GroupItem from "@/Components/GroupItem";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/Components/ui/drawer";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { GroupType } from "@/types";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { PlusCircleIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function GroupsFilter(
    {
        items,
        selectedItems,
        onStateChanged,
    }: {
        items: GroupType[];
        selectedItems: GroupType[];
        onStateChanged: Dispatch<SetStateAction<GroupType[]>>;
    }
) {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()
    // const [selectedStatus, setSelectedStatus] = useState<Status | null>(
    //     null
    // )

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full justify-start border-dashed">
                        {/* {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>} */}
                        <FilterTrigger selectedItems={selectedItems} />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <GroupsList
                            items={items}
                            selectedItems={selectedItems}
                            handleSelect={onStateChanged}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto justify-start border-dashed">
                    {/* {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>} */}
                    <FilterTrigger selectedItems={selectedItems} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <GroupsList
                    items={items}
                    selectedItems={selectedItems}
                    handleSelect={onStateChanged}
                />
            </PopoverContent>
        </Popover>
    )
}

function FilterTrigger(
    {
        selectedItems
    }: {
        selectedItems: GroupType[]
    }
) {
    const itemsCount = selectedItems.length;

    return [
        <PlusCircleIcon className="size-4" />,
        <span>Group</span>,
        itemsCount > 0 && [
            <span className="mx-2">|</span>,
            itemsCount > 2
                ? [
                    <Badge>{selectedItems[0].name}</Badge>,
                    <Badge>{`+${itemsCount - 1}`}</Badge>
                ]
                : selectedItems.map(i => <Badge>{i.name}</Badge>)
        ]
    ]
}

function GroupsList({
    items,
    selectedItems,
    handleSelect,
}: {
    items: GroupType[];
    selectedItems: GroupType[];
    handleSelect: Dispatch<SetStateAction<GroupType[]>>;
}) {
    return (
        <Command>
            <CommandInput
                placeholder="Group"
                className="border-none"
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {items.map((item, index) => {
                        const itemSelected = !!selectedItems.find((i) => i.id === item.id);

                        return (
                            <CommandItem
                                key={index}
                                value={item.name}
                                onSelect={() => {
                                    handleSelect(prevState => {
                                        if (!itemSelected) {
                                            return [...prevState, item]
                                        }

                                        return prevState.filter(i => i.id !== item.id)
                                    })
                                }}
                            >
                                <Checkbox
                                    checked={itemSelected}
                                    className="cursor-default"
                                />
                                <GroupItem
                                    name={item.name}
                                    color={item.color}
                                />
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}