// * Special layout that is used for the auth of the application.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>

      {children}
    </main>
  );
}