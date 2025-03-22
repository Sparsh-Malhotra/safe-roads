import React from "react";
import {
    Coins,
    Award,
    IndianRupee,
    HelpCircle,
    ShieldCheck,
    Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Incentive = () => {
    const [openHelp, setOpenHelp] = React.useState(false);

    const { conversionFactor = "" } = JSON.parse(
        localStorage.getItem("tenant_data") || "{}"
    );
  
    const coins = localStorage.getItem("coins");

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container max-w-md mx-auto pt-20 px-4 pb-12">
                {/* Information Cards */}
                <div className="space-y-4 mb-6">
                    {/* Coin Value Card */}
                    <Card className="border-amber-100 shadow-sm py-4">
                        <CardContent className="px-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <IndianRupee className="h-5 w-5 text-amber-500 mr-2" />
                                    <span className="text-sm font-medium">
                                        1 Coin = {conversionFactor} INR
                                    </span>
                                </div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <HelpCircle className="h-4 w-4 text-gray-400" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="space-y-2">
                                            <h4 className="font-medium text-sm">
                                                About Coin Value
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Coins earned can be redeemed for
                                                their INR value in your next
                                                salary payout at the rate of {conversionFactor} {" "}
                                                INR per coin.
                                            </p>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Incident Rewards Card */}
                    <Card className="border-blue-100 shadow-sm overflow-hidden py-0 gap-2">
                        <CardHeader className="py-3 px-4 bg-blue-50">
                            <div className="flex items-center">
                                <Award className="h-5 w-5 text-blue-500 mr-2" />
                                <h3 className="font-medium text-gray-800">
                                    Earning Coins
                                </h3>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-3">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3">
                                    <div className="flex items-center">
                                        <ShieldCheck className="h-5 w-5 text-blue-500 mr-3" />
                                        <span className="text-sm font-medium">
                                            Incident Approval
                                        </span>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="text-blue-600 bg-blue-100 border-blue-200"
                                    >
                                        +10 coins
                                    </Badge>
                                </div>

                                <div className="flex justify-between items-center bg-green-50 rounded-lg p-3">
                                    <div className="flex items-center">
                                        <Wrench className="h-5 w-5 text-green-500 mr-3" />
                                        <span className="text-sm font-medium">
                                            Resolved Incident
                                        </span>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="text-green-600 bg-green-100 border-green-200"
                                    >
                                        +100 coins
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Coins Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-yellow-400/20 p-3 rounded-full mb-2">
                                <Coins className="h-8 w-8 text-yellow-400" />
                            </div>
                            <h1 className="text-white font-bold text-xl">
                                My Coins
                            </h1>
                            <div className="flex items-center gap-2 bg-gray-800/40 rounded-full px-4 py-2 mt-3">
                                <span className="text-white font-bold text-xl">
                                    {coins}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 pb-1">
                        <p className="text-sm text-gray-600 mb-5 text-center">
                            Earn more coins by reporting road issues, using safe
                            routes, and completing safety modules.
                        </p>
                    </div>
                </div>

                {/* How to Redeem Card */}
                <Card className="mb-8 border-blue-100 py-0 pb-4">
                    <CardHeader className="bg-blue-50 pb-3 pt-4">
                        <div className="flex items-center">
                            <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                            <h2 className="font-semibold text-gray-800">
                                How to Redeem
                            </h2>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Collapsible
                            open={openHelp}
                            onOpenChange={setOpenHelp}
                            className="space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Learn about the redemption process
                                </p>
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="p-0 h-8 w-8"
                                    >
                                        <span className="sr-only">Toggle</span>
                                        {openHelp ? (
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 7H13"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 7H13M7 1V13"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                <div className="rounded-md border border-blue-100 p-3">
                                    <div className="flex gap-2 items-start">
                                        <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">
                                            <span className="text-xs font-bold text-blue-700">
                                                1
                                            </span>
                                        </div>
                                        <p className="text-sm">
                                            Accumulated coins are tracked
                                            throughout the month
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-md border border-blue-100 p-3">
                                    <div className="flex gap-2 items-start">
                                        <div className="bg-blue-100 rounded-full w-8 h-6 flex items-center justify-center">
                                            <span className="text-xs font-bold text-blue-700">
                                                2
                                            </span>
                                        </div>
                                        <p className="text-sm">
                                            Your employer will add the
                                            equivalent INR amount to your next
                                            salary
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-md border border-blue-100 p-3">
                                    <div className="flex gap-2 items-start">
                                        <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">
                                            <span className="text-xs font-bold text-blue-700">
                                                3
                                            </span>
                                        </div>
                                        <p className="text-sm">
                                            After the payout, your coin balance
                                            will reset to 0
                                        </p>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Incentive;
