import { CookiesProvider } from "next-client-cookies/server";
type Props = { children: React.ReactNode };
export default function RootLayout({ children }: Props) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
