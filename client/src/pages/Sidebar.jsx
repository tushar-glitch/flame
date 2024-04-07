import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50">
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <h1 className="text-xl font-bold">Sidebar</h1>
      </div>
      <div className="flex flex-col p-4 space-y-4">
        <button className="sidebar-item">Play</button>
        <Menu as="div" className="relative">
  <div className="flex justify-center">
    <Menu.Button className="sidebar-item">
      Tournament
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
    <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="px-1 py-1">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-gray-700 text-white" : "text-white"
              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
            >
              Join Tournament
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-gray-700 text-white" : "text-white"
              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
            >
              Create Tournament
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  </Transition>
</Menu>

        <button className="sidebar-item">Upcoming Contest</button>
        <button className="sidebar-item">Watch</button>
        <button className="sidebar-item">Contribute Question</button>
        <button className="sidebar-item">Watch</button>
        <div className="flex items-center border border-gray-700 rounded-md px-2">
          <SearchIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none border-none text-white ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
