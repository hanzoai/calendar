import { Navbar } from "@/components/Navbar";
import { Zen } from "@hanzo/font";

const sans = Zen;

export default function Router(props: { calUsername: string; calEmail: string }) {
  return (
    <main className={`flex ${sans.className} text-default dark flex flex-col`}>
      <Navbar username={props.calUsername} />
      <div>
        <h1 className="mx-8 my-4 text-2xl font-bold">This is the router atom</h1>
      </div>
    </main>
  );
}
