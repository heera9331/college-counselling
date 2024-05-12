"use client";
import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { useAuthContext } from "@/hooks";
import { useRouter } from "next/navigation";
import axios from "axios";

const user = {
  name: "Admin",
  email: "admin@gmail.com",
  imageUrl: "/images/user2.png",
};

const navigation = [
  { name: "Home", href: "/home", current: false, isRequiredAdmin: false },
  {
    name: "Dashboard",
    href: "/dashboard",
    current: false,
    isRequiredAdmin: true,
  },
  {
    name: "Students",
    href: "/student",
    current: false,
    isRequiredAdmin: false,
  },
  {
    name: "Counselor",
    href: "/counselor",
    current: false,
    isRequiredAdmin: true,
  },
  {
    name: "View Report",
    href: "/view-report",
    current: false,
    isRequiredAdmin: true,
  },
];

const userNavigation: any[] = [];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user, status, resetState } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      console.log("logout");
      let res = await axios.get("/api/auth/signout");
      console.log("signout url", res);
      resetState();
    } catch (error) {
      console.log("error catched", error);
      alert("Error while signingout");
    }
  };

  useEffect(() => {}, [status]);

  return (
    <>
      <div className="min-h-full max-w-full mx-auto">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto px-2">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    {/* <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div> */}
                    <div className="">
                      <Link href={"/"}>
                        <h1 className="text-2xl font-bold text-gray-100">
                          CounselPro Connect
                        </h1>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {status === "authenticated" && (
                          <>
                            {navigation.map(
                              (item) =>
                                !item.isRequiredAdmin && (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                      item.current
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                      "rounded-md px-3 py-2 text-sm font-medium active:bg-gray-900"
                                    )}
                                    aria-current={
                                      item.current ? "page" : undefined
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                )
                            )}
                            {navigation.map(
                              (item) =>
                                item.isRequiredAdmin &&
                                user?.isAdmin && (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                      item.current
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                      "rounded-md px-3 py-2 text-sm font-medium active:bg-gray-900"
                                    )}
                                    aria-current={
                                      item.current ? "page" : undefined
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                )
                            )}

                            {/* {status == "unauthenticated" ?
                          <Link href={'/login'} className="g-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700">
                            Login
                          </Link>
                          : ""} */}
                          </>
                        )}
                        {status === "unauthenticated" && (
                          <Link
                            href={"/login"}
                            className={classNames(
                              "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium active:bg-gray-900"
                            )}
                            aria-current={"page"}
                          >
                            Login
                          </Link>
                        )}
                        <Link
                          href={"/sitemap"}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium active:bg-gray-900"
                          )}
                          aria-current={"page"}
                        >
                          Sitemap
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      {status === "authenticated" && (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <Image
                                src={"/images/user2.png"}
                                alt=""
                                width={400}
                                height={400}
                                className="h-8 w-8 rounded-full"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                <Link
                                  href={`/backup`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-gray-100"
                                >
                                  Import/Export
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  href={`/counselor/${user?.email}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-gray-100"
                                >
                                  Your Profile
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link
                                  href={`#`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-gray-100"
                                  onClick={() => {
                                    handleLogout();
                                  }}
                                >
                                  Logout
                                </Link>
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image
                        src={"/images/user2.png"}
                        height={400}
                        width={400}
                        alt="user profile image"
                        className="h-8 w-8 rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user?.email}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="bg-red-600"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header> */}
        {/* <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            Your content
          </div>
        </main> */}
      </div>
    </>
  );
}

{
  /* student dropdown */
}
{
  /* <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center bg-gray-800 text-sm focus:outline-none rounded-md px-3 py-2 font-medium">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <Link href={`#`} className="py-2 px-1 font-bold text-gray-300 focus:bg-gray-300 hover:text-white flex justify-center items-center">
                              Students
                            </Link>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <>
                              <Menu.Item>
                                <Link href={`/students/add-student`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white">Add Student</Link>
                              </Menu.Item>
                              <Menu.Item>
                                <Link href={`/students/contact-student`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white">Add Student</Link>
                              </Menu.Item>

                            </>
                          </Menu.Items>

                        </Transition>
                      </Menu> */
}
