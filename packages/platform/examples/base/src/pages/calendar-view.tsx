import { Navbar } from "@/components/Navbar";
import { Zen } from "@hanzo/font";

import { CalendarView } from "@calcom/atoms";

const sans = Zen;

export default function CalendarViewAtom(props: { calUsername: string; calEmail: string }) {
  return (
    <main className={`flex min-h-screen flex-col ${sans.className}`}>
      <Navbar username={props.calUsername} />
      <div data-testid="calendars-settings-atom">
        {/* <CalendarView isEventTypeView={true} username={props.calUsername} eventSlug="sixty-minutes" /> */}
        <CalendarView />
      </div>
    </main>
  );
}
