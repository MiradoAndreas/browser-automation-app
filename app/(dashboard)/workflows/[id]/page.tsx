export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="min-h-svh px-6 py-8">
      <h1 className="text-xl font-medium">Workflow {id}</h1>
    </main>
  )
}
