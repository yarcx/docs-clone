import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Documents",
  description: "Manage your documents",
};

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Documents</h1>
      <p className="text-muted-foreground">
        Welcome to the Documents page. Here you can manage all your documents.
          </p>
          <Link href="/documents/123" className="bg-red-500">
            Create Document
          </Link>
    </div>
  )
}
