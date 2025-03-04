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
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, Loader2Icon, LoaderIcon, SortAscIcon, SortDescIcon } from "lucide-react";
import { useState } from "react";

enum OrderTypesEnum {
    ACS = "asc",
    DESC = "desc",
};

const OrderTypes = [
    {
        type: OrderTypesEnum.ACS,
        label: "Sort ascendent",
    },
    {
        type: OrderTypesEnum.DESC,
        label: "Sort descendent",
    },
];

export default function GroupsUpdatedAtOrder(
    {
        selected,
    }: {
        selected?: string;
    }
) {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()

    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>(selected ?? OrderTypes[0].type);

    const onValueChanged = (type: string) => {
        setLoading(true);
        router.get(route('t.active', { ...route().params }),
            {
                sort: type
            },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setLoading(false),
            });
    }

    const handleSelectItem = (value: string) => {
        setOpen(false);
        setSelectedItem(value);
        onValueChanged(value);
    }

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        <GroupsUpdatedAtOrderTrigger item={selectedItem} loading={loading} />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <OrderTypesList
                            selectedItem={selectedItem}
                            handleChangeOrder={handleSelectItem}
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
                    <GroupsUpdatedAtOrderTrigger item={selectedItem} loading={loading} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <OrderTypesList
                    selectedItem={selectedItem}
                    handleChangeOrder={handleSelectItem}
                />
            </PopoverContent>
        </Popover>
    )
}

function GroupsUpdatedAtOrderTrigger({ item, loading }: { item: string, loading: boolean }) {
    return [
        <span>Last Updated</span>,
        item === "asc" && !loading && (
            <SortAscIcon className="size-4" />
        ),
        item === "desc" && !loading && (
            <SortDescIcon className="size-4" />
        ),
        loading && (
            <LoaderIcon className="size-4 animate-spin" />
        ),
    ];
}

function OrderTypesList({
    selectedItem,
    handleChangeOrder,
}: {
    selectedItem: string;
    handleChangeOrder: (item: string) => void;
}) {
    return (
        <Command>
            <CommandList>
                <CommandGroup>
                    {OrderTypes.map((order, index) => (
                        <CommandItem
                            key={index}
                            value={order.type}
                            onSelect={() => {
                                handleChangeOrder(order.type)
                            }}
                        >
                            {order.type === OrderTypesEnum.ACS && (
                                <SortAscIcon className="size-4" />
                            )}
                            {order.type === OrderTypesEnum.DESC && (
                                <SortDescIcon className="size-4" />
                            )}
                            {order.label}
                            <CommandShortcut>
                                {order.type == selectedItem && (
                                    <CheckIcon className="size-4" />
                                )}
                            </CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}