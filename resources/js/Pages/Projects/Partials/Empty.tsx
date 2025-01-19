import { Button } from "@/Components/ui/button";
import { PlusIcon } from "lucide-react";

export default function Empty() {
    return (
        <div className="flex flex-col items-center space-y-3">
            <h1 className="text-3xl font-bold">No envs</h1>
            <p>You can create one by clicking on the button below</p>
            <Button
                variant="secondary"
            >
                <PlusIcon />
                Create
            </Button>
        </div>
    );
}