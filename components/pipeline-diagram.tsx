"use client"

import Image from "next/image"

export function PipelineDiagram() {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Image
          src="/Pineline.png"
          alt="ViAdverNLI Data Pipeline"
          width={1200}
          height={600}
          className="max-w-full h-auto rounded-lg shadow-lg"
          priority
        />
      </div>
    </div>
  )
} 