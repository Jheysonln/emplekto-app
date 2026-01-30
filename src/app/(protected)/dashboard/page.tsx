import { DashboardStats } from '../../../presentation/components/features/dashboard/dashboard-stats';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - EmplekTo',
  description: 'Panel de control principal',
};

/**
 * Página principal del dashboard
 */
export default function DashboardPage() {
  return (
    <div className="animate-fadeIn">
      <DashboardStats />
    </div>
  );
}
