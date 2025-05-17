'use client';

import AuthLayout from '@/components/layouts/AuthLayout';

export default function AddLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout requireAuth>{children}</AuthLayout>;
} 