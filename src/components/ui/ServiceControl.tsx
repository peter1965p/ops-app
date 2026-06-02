"use client";

import { Button } from "@/components/ui/button";
import { toggleContainer } from "@/lib/actions/sector.actions";
import { toast } from "sonner"; // Hier wird sonner importiert

export function ServiceControl({ id, status }: { id: string, status: string }) {
    const handleAction = async () => {
        const action = status === 'running' ? 'stop' : 'start';

        // Toast für "Ladevorgang"
        const loadingToast = toast.loading(`Container wird ${action}gestartet...`);

        try {
            const result = await toggleContainer(id, action);
            toast.dismiss(loadingToast);

            // SICHERHEIT: Prüfen ob result überhaupt existiert
            if (!result) {
                throw new Error("Keine Antwort vom Server erhalten.");
            }

            if (result.success) {
                toast.success(`Container wurde erfolgreich ${action === 'start' ? 'gestartet' : 'gestoppt'}`);
            } else {
                toast.error(`Fehler: ${result.error || "Aktion fehlgeschlagen"}`);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            // LOGGE den Fehler in die Konsole, damit du siehst, WAS undefined ist!
            console.error("ServiceControl Error:", error);
            toast.error("Ein unerwarteter Fehler ist aufgetreten.");
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleAction}
            className="h-8 text-xs bg-slate-900 text-gray-600 border-orange-600 rounded"
        >
            {status === 'running' ? "Stoppen" : "Starten"}
        </Button>
    );
}