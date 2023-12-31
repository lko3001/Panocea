export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen grid place-items-center">{children}</div>;
}
