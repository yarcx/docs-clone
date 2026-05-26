"use client ";

import React from "react";
import Editor from "./editor";
import Toolbar from "./toolbar";

interface PageProps {
  params: {
    documentId: string;
  };
}

const page = async ({ params }: PageProps) => {

  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default page;
