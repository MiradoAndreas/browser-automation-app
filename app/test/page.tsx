import Link from "next/link"

export default function TestPage() {
  return (
    <main className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold">Protected test page</h1>
      <p>You are signed in and can access this protected page.</p>
      <Link href="/" className="w-fit underline underline-offset-4">
        Back to home
      </Link>
    </main>
  )
}
