'use client';

import AuthLayout from '@/components/layouts/AuthLayout';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout requireAuth>{children}</AuthLayout>;
} 