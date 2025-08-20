import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
const BKASH_NUMBER = "01XXXXXXXXX";

function BkashPaymentSection({ event }) {
    const [showHelp, setShowHelp] = useState(false);

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("নাম্বার কপি হয়েছে!");
        } catch {
            toast.error("কপি করা যায়নি, আবার চেষ্টা করুন।");
        }
    };

    return (
        <div className="rounded-xl overflow-hidden border">
            {/* Header strip with bKash look */}
            <div className="bg-gradient-to-r from-[#E2136E] to-[#F0006E] px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold">
                        ৳
                    </div>
                    <div>
                        <p className="text-sm leading-tight font-semibold">
                            bKash Manual Payment
                        </p>
                        <p className="text-xs opacity-90">
                            নিরাপদে পেমেন্ট করুন, TrxID সাবমিট করুন
                        </p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 bg-white">
                {/* Number + Amount row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-500">বিকাশ নাম্বার</p>
                        <div className="mt-1 flex items-center gap-2">
                            <span className="font-semibold text-lg tracking-wider">
                                {BKASH_NUMBER}
                            </span>
                            <Button
                                type="button"
                                onClick={() => handleCopy(BKASH_NUMBER)}
                                className="h-8 px-3 bg-[#E2136E] hover:bg-[#c80f5f]"
                            >
                                কপি
                            </Button>
                        </div>
                    </div>

                    <div className="sm:text-right">
                        <p className="text-xs text-gray-500">পেমেন্ট এমাউন্ট</p>
                        <p className="mt-1 font-semibold text-lg">
                            {event.fee ? `৳ ${event.fee}` : "আয়োজক নির্ধারিত"}
                        </p>
                        {!event.fee && (
                            <p className="text-[11px] text-gray-500">
                                *ইভেন্ট পেজ/আয়োজকের নির্দেশনা দেখুন
                            </p>
                        )}
                    </div>
                </div>

                {/* Step-by-step guide */}
                <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">
                        পেমেন্ট করার ধাপসমূহ
                    </p>
                    <ol className="space-y-2 text-sm">
                        <li className="flex gap-2">
                            <span className="h-6 w-6 shrink-0 rounded-full bg-[#E2136E] text-white flex items-center justify-center text-xs font-bold">
                                1
                            </span>
                            <span>
                                <b>bKash App</b> খুলুন (বা *247# ডায়াল করুন) ।
                            </span>
                        </li>
                        <li className="flex gap-2">
                            <span className="h-6 w-6 shrink-0 rounded-full bg-[#E2136E] text-white flex items-center justify-center text-xs font-bold">
                                2
                            </span>
                            <span>
                                <b>Send Money</b> অপশনে যান এবং এই নাম্বারটি
                                লিখুন:{" "}
                                <b className="tracking-wider">{BKASH_NUMBER}</b>
                                {event.fee && (
                                    <>
                                        {" "}
                                        এবং <b>Amount</b> এ <b>৳ {event.fee}</b>{" "}
                                        লিখুন।
                                    </>
                                )}
                            </span>
                        </li>
                        <li className="flex gap-2">
                            <span className="h-6 w-6 shrink-0 rounded-full bg-[#E2136E] text-white flex items-center justify-center text-xs font-bold">
                                3
                            </span>
                            <span>
                                <b>Reference</b> এ আপনার মোবাইল নাম্বার/নাম
                                লিখতে পারেন (ঐচ্ছিক), এরপর <b>Next</b>।
                            </span>
                        </li>
                        <li className="flex gap-2">
                            <span className="h-6 w-6 shrink-0 rounded-full bg-[#E2136E] text-white flex items-center justify-center text-xs font-bold">
                                4
                            </span>
                            <span>
                                বিস্তারিত যাচাই করে <b>bKash PIN</b> দিয়ে{" "}
                                <b>Confirm</b> করুন।
                            </span>
                        </li>
                        <li className="flex gap-2">
                            <span className="h-6 w-6 shrink-0 rounded-full bg-[#E2136E] text-white flex items-center justify-center text-xs font-bold">
                                5
                            </span>
                            <span>
                                পেমেন্ট সফল হলে SMS/Notification এ <b>TrxID</b>{" "}
                                পাবেন। নিচে সেই <b>TrxID</b> লিখে সাবমিট করুন।
                            </span>
                        </li>
                    </ol>

                    {/* Help toggle */}
                    <button
                        type="button"
                        onClick={() => setShowHelp((s) => !s)}
                        className="mt-3 text-xs underline text-[#E2136E]"
                    >
                        {showHelp ? "সহায়তা লুকান" : "TrxID কোথায় পাবেন?"}
                    </button>
                    {showHelp && (
                        <div className="mt-2 text-xs text-gray-600 bg-gray-50 border rounded-lg p-3">
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    bKash App → “<b>History</b>” → সর্বশেষ Send
                                    Money → TrxID দেখুন।
                                </li>
                                <li>
                                    SMS ইনবক্সে bKash মেসেজে TrxID থাকে (যেমন:{" "}
                                    <code>7D3A9K2MXY</code> টাইপ)।
                                </li>
                                <li>
                                    TrxID সাধারণত ৮–১৬ অক্ষরের ইংরেজি বর্ণ ও
                                    সংখ্যা মিশ্রণ।
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* TrxID input */}
                <div className="mt-4">
                    <label className="block text-sm font-medium">
                        ট্রান্স্যাকশন আইডি (TrxID)
                    </label>
                    <input
                        type="text"
                        name="transactionId"
                        placeholder="যেমন: 7D3A9K2MXY"
                        pattern="[A-Za-z0-9]{8,16}"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-pink-200 tracking-wider"
                        required
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                        শুধুমাত্র ইংরেজি বর্ণ/সংখ্যা, ৮–১৬ অক্ষর।
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BkashPaymentSection;
