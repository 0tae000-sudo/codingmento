import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";

import "./app.css";
import Navigation from "./common/components/navigation";
import { Settings } from "luxon";
import { FilesProvider } from "~/hooks/use-files";
import { cn } from "~/lib/utils";
import { makeSSRClient } from "./supa-client";
import type { Route } from "./+types/root";
import { getUserById } from "./features/users/queries";

export const meta = () => [
  { title: "코딩멘토 | 현재 개발자의 맞춤형 코딩 교육" },
  { name: "description", content: "현재 개발자의 맞춤형 코딩 교육" },
  { property: "og:type", content: "website" },
  { property: "og:title", content: "코딩멘토" },
  {
    property: "og:description",
    content: "현재 개발자의 맞춤형 코딩 교육",
  },
  { property: "og:image", content: "/images/3.jpg" },
  { property: "og:locale", content: "ko_KR" },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/images/favicon/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/images/favicon/favicon-16x16.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/images/favicon/apple-icon-180x180.png",
  },
  { rel: "manifest", href: "/images/favicon/manifest.json" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";
  return (
    <html lang="ko" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: { request: Request }) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById(client, { id: user.id });
    return { user, profile };
  }
  return { user: null, profile: null };
};

export default function App({
  loaderData,
}: {
  loaderData: { user: any; profile: any };
}) {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isLoggedIn = loaderData.user !== null;
  return (
    <FilesProvider>
      <div
        className={cn({
          "py-28 px-5 md:px-20": !pathname.includes("/auth/"),
          "transition-opacity animate-pulse": isLoading,
        })}
      >
        {pathname.includes("/auth") ? null : (
          <Navigation
            isLoggedIn={isLoggedIn}
            username={loaderData.profile?.username}
            avatar={loaderData.profile?.avatar}
            name={loaderData.profile?.name}
            hasNotifications={false}
            hasMessages={false}
            isTeacher={loaderData.profile?.is_teacher ?? false}
          />
        )}
        <Outlet />
      </div>
    </FilesProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
