"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function ButtonSubmit({ label, disabled, loading }: { label: string, disabled?: boolean, loading?: boolean }) {
    return (
        <Button type="submit" disabled={disabled || loading} className="w-full">
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {label}
        </Button>
    );
}
