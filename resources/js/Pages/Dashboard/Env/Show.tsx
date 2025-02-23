import { Lock, Trash, Plus, RotateCcwIcon, SaveIcon, ArchiveRestoreIcon, Loader2Icon, ArchiveIcon } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { EvironmentVariableType } from "@/types";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/Components/ui/table";
import { cn } from "@/lib/utils";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useConfirm } from "@/providers/ConfirmAlertProvider";
import { IconTypes } from "@/lib/infoIcons";
import { toast } from "sonner";

export default function EnvFields({
    initialFields = [],
}: {
    initialFields: EvironmentVariableType[];
}) {
    const { openConfirm } = useConfirm()

    const {
        data,
        setData,
        setError,
        put,
        reset,
        processing,
    } = useForm({
        fields: initialFields || [],
        newField: { env_key: "", env_value: "", error: "" },
    });

    const envId = route().routeParams.env_id;

    const isModified = JSON.stringify(data.fields) !== JSON.stringify(initialFields);

    const handleInputChange = (id: number, fieldName: "env_key" | "env_value", value: string) => {
        const updatedFields = data.fields.map((field) =>
            field.id === id
                ? {
                    ...field,
                    [fieldName]: value,
                    error: fieldName === "env_key" && !value.trim() ? "Key is required" : "",
                }
                : field
        )
        setData("fields", updatedFields);
    };

    const handleChangeNewEnv = (fieldName: "env_key" | "env_value", value: string) => {
        const error = fieldName === "env_key" && !value.trim() ? "Key is required" : "";
        setData("newField", { ...data.newField, [fieldName]: value, error });
    }

    const handleDelete = (id: number) => {
        const updatedFields = data.fields.filter((field) => field.id !== id);
        setData("fields", updatedFields);
    };

    const handleArchive = (id: number) => {
        const updatedFields = data.fields.map((field) =>
            field.id === id
                ? {
                    ...field,
                    is_archived: !field.is_archived
                }
                : field
        )

        setData("fields", updatedFields);
    };

    const handleAddField = () => {
        if (!data.newField.env_key.trim()) {
            return setData("newField", {
                ...data.newField,
                error: "Key is required",
            });
        }

        const newField: EvironmentVariableType = {
            id: Date.now(),
            is_available: true,
            is_archived: false,
            is_new: true,
            ...data.newField,
        };

        setData("fields", [...data.fields, newField]);
        setData("newField", { env_key: "", env_value: "", error: "" });
        setError("newField", "");
    };

    const resetChanges = () => {
        reset("fields");
    };

    const handleSave = () => {
        put(route('env-field.update', { 'env_id': envId }), {
            preserveScroll: true,
            onSuccess: () => toast.success("Environment variables have been updated"),
        });
    };

    const hasErrors = () => {
        return (
            data.fields.some((field) => field.error) || data.newField.error !== ""
        );
    };

    const confirmDelete = () => {
        openConfirm({
            title: "Save changes?",
            description: "Are you sure you want to save the changes you made? Once saved, you won't be able to revert to the previous version.",
            onConfirm: handleSave,
            type: IconTypes.WARNING
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-4">
                <Table>
                    <TableBody>
                        {data.fields.map((field: EvironmentVariableType, index: number) => (
                            <TableRow key={field.id}>
                                <TableCell className={cn("w-16 text-right", field.is_archived ? "text-muted-foreground" : "text-foreground")}>
                                    {field.is_archived && '//'}
                                    {`  ${index + 1}.`}
                                </TableCell>
                                <TableCell className="align-top">
                                    <Input
                                        value={field.env_key}
                                        onChange={(e) =>
                                            handleInputChange(field.id, "env_key", e.target.value)
                                        }
                                        placeholder="Key"
                                        disabled={!field.is_available || field.is_archived}
                                    />

                                    {field.error && getErrorText(field.error)}
                                </TableCell>
                                <TableCell className="align-top">
                                    <Input
                                        value={field.env_value}
                                        onChange={(e) =>
                                            handleInputChange(field.id, "env_value", e.target.value)
                                        }
                                        placeholder="Value"
                                        disabled={!field.is_available || field.is_archived}
                                        type={!field.is_available ? "password" : "text"}
                                    />
                                </TableCell>
                                <TableCell className="w-32 text-center align-top">
                                    {field.is_available ? (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleArchive(field.id)}
                                            >
                                                {field.is_archived && <ArchiveRestoreIcon />}
                                                {!field.is_archived && <ArchiveIcon />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(field.id)}
                                                className="text-red-600 hover:text-red-600 hover:bg-red-600/10"
                                            >
                                                <Trash />
                                            </Button>
                                        </>
                                    ) : (
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell className="align-top">
                                <Input
                                    placeholder="Key"
                                    value={data.newField.env_key}
                                    onChange={(e) =>
                                        handleChangeNewEnv("env_key", e.target.value)
                                    }
                                />

                                {data.newField.error && getErrorText(data.newField.error)}
                            </TableCell>
                            <TableCell className="align-top">
                                <Input
                                    placeholder="Value"
                                    value={data.newField.env_value}
                                    onChange={(e) =>
                                        handleChangeNewEnv("env_value", e.target.value)
                                    }
                                />
                            </TableCell>
                            <TableCell className="w-32 text-center align-top">
                                <Button variant="ghost" size="icon" onClick={handleAddField}>
                                    <Plus />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                <div className="flex justify-end gap-4">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={resetChanges}
                        disabled={!isModified || processing}
                    >
                        <RotateCcwIcon />
                    </Button>

                    <Button
                        disabled={!isModified || hasErrors() || processing}
                        onClick={confirmDelete}
                    >
                        {processing
                            ? <Loader2Icon className="animate-spin" />
                            : <SaveIcon />
                        }
                        Сохранить
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

const getErrorText = (errorText: string) => (
    <p className="text-sm font-medium text-destructive mt-2">
        {errorText}
    </p>
)