// * Special layout that is used for the root of the application.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      SIDEBAR
      {children}
    </main>
  );
}