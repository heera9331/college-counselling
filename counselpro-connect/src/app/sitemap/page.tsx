"use client"; 
import Link from "next/link";

export default function Page(props: any) {
  // const { data, status } = useSession();

  const links = [
    { path: "/", title: "Main Page" },
    { path: "/login", title: "Login" },
    { path: "/contact", title: "Contact us" },
    { path: "/about", title: "About us" },
    { path: "/sitemap", title: "SiteMap" },
    { path: "/logout", title: "Logout" },
    { path: "/tests", title: "Tests" },
  ];

  return (
    <div className="px-2 bg-white-300">
      <h1 className="font-semibold text-2xl ">SiteMap</h1>

      <div className="md:flex md:gap-4">
        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-semibold">Normal Routes</h3>
          {links.map((link, idx) => {
            return (
              <Link
                key={idx}
                href={link.path}
                className="text-blue-800 underline font-semibold"
              >
                {link.title} - {link.path}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-semibold">Userful Routes</h3>
          <Link
            href={"/home"}
            className="text-blue-800 underline font-semibold"
          >
            Counsel Home
          </Link>
          <Link
            href={"/dashboard"}
            className="text-blue-800 underline font-semibold"
          >
            Dashboard - /dashboard
          </Link>

          {/* <Link
                        href={'/home/view-student'}
                        className="text-blue-800 underline font-semibold"
                    >
                        View Student - /home/view-student
                    </Link> */}

          {/* <Link
            href={`/profile?email=${data?.user?.email}`}
            className="text-blue-800 underline font-semibold"
          >
            Profile - /profile
          </Link> */}
          <Link
            href={`/counselor`}
            className="text-blue-800 underline font-semibold"
          >
            Counselor - /counselor
          </Link>
          <Link
            href={`/student`}
            className="text-blue-800 underline font-semibold"
          >
            Students - /student
          </Link>
          <Link
            href={`/view-report`}
            className="text-blue-800 underline font-semibold"
          >
            View Report - /student
          </Link>
        </div>
      </div>
    </div>
  );
}
