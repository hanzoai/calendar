import { Navbar } from "@/components/Navbar";
import { ZenSans } from "@hanzo/font";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { PaymentForm } from "@calcom/atoms";

const inter = ZenSans;

export default function Payment(props: { calUsername: string; calEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const uid = pathname.split("/").pop();

  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <Navbar username={props.calUsername} />
      <PaymentForm
        paymentUid={uid ?? ""}
        onPaymentSuccess={() => {
          router.push("/bookings");
        }}
        onPaymentCancellation={() => {
          router.back();
        }}
      />
    </main>
  );
}
