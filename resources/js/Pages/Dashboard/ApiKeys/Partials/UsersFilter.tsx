import GroupItem from "@/Components/GroupItem";
import UserSmallItem from "@/Components/UserSmallItem";
import { Button } from "@/Components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/Components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/Components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ApiKeyUserType, GroupType } from "@/types";
import { router } from "@inertiajs/react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, LoaderIcon } from "lucide-react";
import { forwardRef, useState } from "react";

export default function UsersFilter(
    {
        items,
        selected,
    }: {
        items: ApiKeyUserType[];
        selected?: ApiKeyUserType;
    }
) {
    console.log(items)
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()

    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(selected || items[0])

    const onValueChanged = (user: ApiKeyUserType) => {
        setLoading(true);
        router.get(user.link, {},
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setLoading(false),
            }
        );
    }

    const handleSelectItem = (value: ApiKeyUserType) => {
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
                className="w-60 relative justify-between pr-8"
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
    items: ApiKeyUserType[];
    selectedItem: ApiKeyUserType;
    handleSelect: (item: ApiKeyUserType) => void;
}) {
    console.log(items)
    return (
        <Command>
            <CommandInput
                placeholder="User"
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
                            <UserSmallItem
                                name={item.name}
                                avatar={item.avatar}
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