"use client ";

import React from "react";
import Editor from "./editor";

interface PageProps {
  params: {
    documentId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { documentId } = params;
  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Editor />
    </div>
  );
};

export default page;
