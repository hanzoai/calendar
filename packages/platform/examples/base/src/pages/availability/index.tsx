import { Navbar } from "@/components/Navbar";
import { Zen } from "@hanzo/font";

import { ListSchedules, CreateSchedule } from "@calcom/atoms";

const sans = Zen;

export default function Availability(props: { calUsername: string; calEmail: string }) {
  return (
    <main className={`flex min-h-screen flex-col ${sans.className}`}>
      <Navbar username={props.calUsername} />
      <div className="m-5 flex flex-col gap-4">
        <div data-testid="create-schedule-atom">
          <CreateSchedule name="Create new schedule" />
        </div>

        <div data-testid="list-schedules-atom">
          <ListSchedules getScheduleUrl={(scheduleId) => `/availability/${scheduleId}`} />
        </div>
      </div>
    </main>
  );
}
