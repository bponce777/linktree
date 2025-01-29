"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LinkProfile() {
  const [isCopiedLink, setisCopiedLink] = useState(false);

  const copyLink = () => {
    const url = `${window.location.origin}/briandev`;
    navigator.clipboard.writeText(url);
    setisCopiedLink(true);
  };

  return (
    <div className="bg-indigo-100 rounded-3xl">
      <div className="flex flex-col items-center justify-center text-center py-4 px-4 gap-2 md:flex-row 
      md:justify-between md:text-left">
        <span className="text-sm">
          <span>👾 Your BPTree is live!: </span> {window.location.origin}
          @bptree
        </span>

        <Button
          variant="outline"
          className="rounded-full px-4 bg-white font-semibold text-xs md:text-[14px]"
          onClick={copyLink}
        >
          {isCopiedLink ? "Copied!" : "Copy your Bptree URL"}
        </Button>
      </div>
    </div>
  )
}
