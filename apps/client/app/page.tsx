export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await fetch("http://localhost:3001/hello").then((res) =>
    res.json()
  );
  return (
    <div>
      Travian
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
