'use client';

import { usePathname } from 'next/navigation';
import {Header} from '@/components/Header/Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noHeader = ['/signin', '/signup'];

  return (
    <>
      {!noHeader.includes(pathname) && <Header />}
      <main>{children}</main>
    </>
  );
}
