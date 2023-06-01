import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { links } from "./Mylinks";
import { ChevronUp, ChevronDown } from "lucide-react";

type Props = {
  key: string;
  auth: boolean;
};

const NavLinks = (props: Props) => {
  const [heading, setHeading] = useState("");
  console.log(heading);
  return (
    <>
      {links.map((link) => (
        <>
          {link.auth === props.auth && (
            <div key={link.name}>
              <div className="px-3 text-left md:cursor-pointer group">
                <h1
                  className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
                  onClick={() => {
                    heading !== link.name
                      ? setHeading(link.name)
                      : setHeading("");
                  }}
                >
                  {link.name}
                  <span className="text-xl md:hidden inline">
                    {heading === link.name ? <ChevronUp /> : <ChevronDown />}
                  </span>
                  <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                    <ChevronDown />
                  </span>
                </h1>
                {link.sublinks && (
                  <div>
                    <div className="absolute top-20 hidden group-hover:md:block hover:md:block z-50">
                      <div className="py-3">
                        <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                      </div>
                      <div className="bg-white p-5 gap-10">
                        {link.sublinks.map((mysublinks) => (
                          <li
                            className="text-sm text-gray-600 my-2.5"
                            key={`d${mysublinks.name}`}
                          >
                            <NavLink
                              to={mysublinks.link}
                              className="hover:text-top-digital"
                            >
                              {mysublinks.name}
                            </NavLink>
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`${heading === link.name ? "md:hidden" : "hidden"}`}
              >
                {/* sublinks */}
                {link.sublinks.map((sLink) => (
                  <div key={`m${sLink.name}`}>
                    <div>
                      <div
                        className={`${
                          heading === link.name ? "md:hidden" : "hidden"
                        }`}
                      >
                        <li className="py-3 pl-5">
                          <NavLink
                            to={sLink.link}
                            className="hover:text-top-digital"
                          >
                            {sLink.name}
                          </NavLink>
                        </li>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default NavLinks;
