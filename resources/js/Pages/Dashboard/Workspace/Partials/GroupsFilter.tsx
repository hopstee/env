import GroupItem from "@/Components/GroupItem";
import { Button } from "@/Components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/Components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/Components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { GroupType } from "@/types";
import { router } from "@inertiajs/react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, LoaderIcon } from "lucide-react";
import { forwardRef, useState } from "react";

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

    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(selected || items[0])

    const onValueChanged = (group: GroupType) => {
        setLoading(true);
        router.get(group.link, {},
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setLoading(false),
            }
        );
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
                    <TriggerButton
                        value={selectedItem.name}
                        loading={loading}
                        isMobile={true}
                    />
                    {/* <Button variant="outline" className="w-full relative justify-between pr-8">
                        <p className="truncate">
                            {selectedItem.name}
                        </p>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {loading && (
                                <LoaderIcon className="size-4 animate-spin" />
                            )}
                            {!loading && (
                                <ChevronsUpDownIcon className="size-4" />
                            )}
                        </div>
                    </Button> */}
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
                <TriggerButton
                    value={selectedItem.name}
                    loading={loading}
                    open={open}
                />
                {/* <Button variant="outline" className="relative justify-between pr-8">
                    <p className="truncate">
                        {selectedItem.name}
                    </p>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {loading && (
                            <LoaderIcon className="size-4 animate-spin" />
                        )}
                        {!loading && (
                            <ChevronDownIcon className={cn(
                                "size-4 transition-all duration-200",
                                open && "rotate-180"
                            )} />
                        )}
                    </div>
                </Button> */}
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <GroupsList
                    items={items}
                    selectedItem={selectedItem}
                    handleSelect={handleSelectItem}
                />
            </PopoverContent>
        </Popover>
    )
}

type TriggerButtonProps = {
    value: string;
    loading: boolean;
    open?: boolean;
    isMobile?: boolean;
};

const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
    ({ value, loading = false, open = false, isMobile = false, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                variant="outline"
                className="w-full relative justify-between pr-8"
                {...props}
            >
                <p className="truncate">{value}</p>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {loading && (
                        <LoaderIcon className="size-4 animate-spin" />
                    )}
                    {!loading && !isMobile && (
                        <ChevronDownIcon className={cn(
                            "size-4 transition-all duration-200",
                            open && "rotate-180"
                        )} />
                    )}
                    {!loading && isMobile && (
                        <ChevronsUpDownIcon className="size-4" />
                    )}
                </div>
            </Button>
        );
    }
);

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
                className="border-none"
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