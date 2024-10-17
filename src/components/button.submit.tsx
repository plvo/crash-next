"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function ButtonSubmit({ label, disabled }: { label: string, disabled?: boolean }) {
    return (
        <Button type="submit" disabled={disabled} className="w-full">
            {disabled && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {label}
        </Button>
    );
}
