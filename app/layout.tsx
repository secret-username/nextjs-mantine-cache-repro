import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
//import { theme } from '@/styles/theme';

/*
  NOTE: Tested Workaround is intentionally commented out here to reproduce the bug.
  Enabling the theme override will unmount modals on close to prevent Next.js cache snapshotting the exit animation
*/

export const metadata = {
  title: 'Mantine Modal Bug Repro',
  description: 'Reproduction of Mantine Modal overlay bug on route change',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider /*theme={theme}*/>{children}</MantineProvider>
      </body>
    </html>
  );
}
