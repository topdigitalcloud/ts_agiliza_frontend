import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";

//icons
import { X, Menu, ChevronDownIcon } from "lucide-react";

//redux Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { logout, loginSelector, reset } from "../../slices/LoginSlice";

//links
import { links } from "./Mylinks";

//url for logo
import { urlapp } from "../../utils/config";

//react-router-dom
import { NavLink } from "react-router-dom";

//hooks
import { useAuth } from "../../hooks/useAuth";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  //Auth status
  const { auth } = useAuth();

  //redux
  //Login slice

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //dispatch for logout
  const dispatch = useAppDispatch();
  const { success } = useAppSelector(loginSelector);

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  //show success message and clean all auth states
  useEffect(() => {
    dispatch(reset());
    return;
  }, [dispatch, success]);

  return (
    <header className="bg-top-digital bg-opacity-25">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className={`flex lg:flex-1 ${!auth ? "items-center justify-center" : ""}`}>
          <NavLink to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Top Digital - Agiliza</span>
            <img
              src={`${urlapp}/img/logo-top-digital-agi.png`}
              alt="Top Digital - Agiliza"
              className={`md:cursor-pointer ${!auth ? "h-16 w-auto" : "h-16 w-auto"}`}
            />
          </NavLink>
        </div>
        {auth && (
          <>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Abrir o menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              {links.map((category, index) => (
                <div key={index}>
                  {category.sublinks === undefined ? (
                    <>
                      {category.auth && auth && (
                        <NavLink to={category.link} className="text-sm font-semibold leading-6 text-gray-900">
                          {category.name}
                        </NavLink>
                      )}
                      {!category.auth && !auth && (
                        <NavLink to={category.link} className="text-sm font-semibold leading-6 text-gray-900">
                          {category.name}
                        </NavLink>
                      )}
                    </>
                  ) : (
                    <>
                      {category.auth && auth && (
                        <Popover className="relative">
                          <>
                            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none">
                              {category.name}
                              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                {({ close }) => (
                                  <div className="p-4">
                                    {category.sublinks.map((item, index) => (
                                      <div
                                        key={index}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                      >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                          <item.icon
                                            className="h-6 w-6 text-gray-600 group-hover:text-top-digital-buttom-hover"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="flex-auto">
                                          {item.navLink ? (
                                            <NavLink
                                              to={item.link}
                                              onClick={() => close()}
                                              className="block font-semibold text-gray-900"
                                            >
                                              {item.name}
                                            </NavLink>
                                          ) : (
                                            <a
                                              href={item.link}
                                              onClick={() => close()}
                                              className="block font-semibold text-gray-900"
                                            >
                                              {item.name}
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </Popover.Panel>
                            </Transition>
                          </>
                        </Popover>
                      )}
                    </>
                  )}
                </div>
              ))}
            </Popover.Group>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {auth ? (
                <button onClick={(e) => handleLogout(e)} className="text-sm font-semibold leading-6 text-gray-900">
                  Sair <span aria-hidden="true">&rarr;</span>
                </button>
              ) : (
                <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                  Entrar <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </>
        )}
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {links &&
                links.map((category, index) => (
                  <div className="space-y-2 py-6" key={index}>
                    {category.sublinks === undefined ? (
                      <>
                        {category.auth && auth && (
                          <NavLink
                            to={category.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {category.name}
                          </NavLink>
                        )}
                        {!category.auth && !auth && (
                          <NavLink
                            to={category.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {category.name}
                          </NavLink>
                        )}
                      </>
                    ) : (
                      <>
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                {category.name}
                                <ChevronDownIcon
                                  className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {category.sublinks.map((item) => (
                                  <>
                                    {item.navLink ? (
                                      <Disclosure.Button
                                        key={item.name}
                                        as={NavLink}
                                        to={item.link}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                      >
                                        {item.name}
                                      </Disclosure.Button>
                                    ) : (
                                      <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        onClick={() => setMobileMenuOpen(false)}
                                        href={item.link}
                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                      >
                                        {item.name}
                                      </Disclosure.Button>
                                    )}
                                  </>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </>
                    )}
                  </div>
                ))}
              <div className="space-y-2 py-6">
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setMobileMenuOpen(false);
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
