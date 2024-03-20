import React, { useRef } from "react";
import Input from "../components/Input";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { HiOutlineChatAlt, HiOutlineBell } from "react-icons/hi";
import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
function Header() {
  const ref = useRef(null);
  const navigate = useNavigate();
  return (
    <div className="  bg-white h-14 py-4 px-4 flex justify-between border-b border-gray-200 mb-2 items-center">
      <div className="relative">
        <LocationSearchingIcon
          fontSize="medium"
          className="text-gray-400 absolute top-1/2 -translate-y-3 left-2"
        />
        <Input
          ref={ref}
          placeholder="Search.."
          type="text"
          className="rounded-md placeholder:text-slate-700 text-black px-6 text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 pl-11"
        />
      </div>
      <div className="flex items-center gap-[12px] mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  " p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text=opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
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
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1  ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-0.5 text-sm">
                      This is a panel message.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  " p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text=opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={24} />
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
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1  ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notifications
                    </strong>
                    <div className="mt-2 py-0.5 text-sm">
                      This is a panel notification
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Menu as="div" className="relative ">
          <div className="pt-2">
            <Menu.Button className="inline-flex  rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400 ml-2 ">
              <span className="sr-only ">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-position-center"
                style={{
                  backgroundImage: `url("https://source.unsplash.com/80x80?face)`,
                }}
              >
                <span className="sr-only ">Subhamoy Ghosh</span>
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
                <Menu.Items className="origin-top-right z-10 top-11 absolute border border-gray-100 right-0 mt-2 w-48 rounded-sm shadow-sm p-1 bg-white ring-black ring-opacity-5 focus:outline-none ">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active && "bg-gray-100",
                          "text-gray-700 cursor-pointer focus:bg-gray-200 block rounded-sm px-4 py-2  "
                        )}
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        Your Profile
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active && "bg-gray-100",
                          "text-gray-700 cursor-pointer focus:bg-gray-200 block rounded-sm px-4 py-2  "
                        )}
                        onClick={() => {
                          navigate("/settings");
                        }}
                      >
                        Settings
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu.Button>
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
