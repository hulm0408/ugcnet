import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice Questions — Mock Test & Review',
  description: 'Take UGC NET Arabic mock tests or practice specific units and topics at your own pace.',
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
