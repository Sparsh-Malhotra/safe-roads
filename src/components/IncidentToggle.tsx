import { cn } from "@/lib/utils";
import { Toggle } from "./ui/toggle";
import { Flag, FlagOff } from 'lucide-react';

const IncidentToggle = ({ showIssues, onToggle, className }) => {
    return (
        <div
            className={cn(
                "flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md",
                className
            )}
        >
            <Toggle
                pressed={showIssues}
                onPressedChange={onToggle}
                aria-label="Toggle incidents visibility"
                className="data-[state=on]:bg-red-100"
            >
                {showIssues ? (
                    <Flag className="h-4 w-4 text-red-500" />
                ) : (
                    <FlagOff className="h-4 w-4 text-gray-500" />
                )}
                <span className="ml-2 text-xs font-medium">
                    Nearby Incidents
                </span>
            </Toggle>
        </div>
    );
};

export default IncidentToggle;
