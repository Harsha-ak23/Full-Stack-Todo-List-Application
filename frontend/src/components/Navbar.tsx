import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from "@headlessui/react";
  import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
  import { useState } from "react";
  import { useAuthStore } from "../store/useAuthStore";
  import { updateUserAPI } from "../api/user";
  import type { EditUserFormType } from "../schemas/authSchema";
  import UserProfile from "../pages/UserProfile";
  import EditUserModal from "../pages/EditUser";
import { Link } from "react-router-dom";
import Icon from '../assets/icon.jpg'
  
  // ----------------------
  // Utilities
  // ----------------------
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  
  // ----------------------
  // Navigation Items
  // ----------------------
  type NavigationItem = {
    name: string;
    href: string;
    current: boolean;
  };
  
  const navigation: NavigationItem[] = [
    { name: "Home", href: "/", current: true },
  ];
  
  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
  
    const { user, logout, updateUser } = useAuthStore();
  
    // ----------------------
    // Logout handler
    // ----------------------
    const handleLogout = () => {
      logout();
    };
  
    // ----------------------
    // Update user handler
    // ----------------------
    const handleUpdateUser = async (data: EditUserFormType) => {
      if (!user?._id) return;
  
      try {
        const updated = await updateUserAPI(user._id, data);
        updateUser(updated.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <Disclosure as="nav" className="relative bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
  
            {/* Mobile menu */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
                <Bars3Icon className="block size-6 group-data-open:hidden" />
                <XMarkIcon className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
  
            {/* Logo + Navigation */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <h2 className="text-center font-bold text-2xl text-blue-400">
                Todo Application
              </h2>
  
              {/* Desktop Menu */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Right side */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6 sm:pr-0">
  
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full">
                  <img
                    alt="User"
                    src={user?.avatar || Icon}
                    className="size-8 rounded-full bg-gray-800"
                  />
                </MenuButton>
  
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
  
                  <MenuItem>
                    <button
                      onClick={() => setIsOpen(true)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your profile
                    </button>
                  </MenuItem>
  
                  <MenuItem>
                    <button
                      onClick={() => setIsEditOpen(true)}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit User
                    </button>
                  </MenuItem>
  
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </MenuItem>
  
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
  
        {/* Mobile Navigation */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
  
        {/* Profile Modal */}
        {user && (
          <UserProfile
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
  
        {/* Edit User Modal */}
        <EditUserModal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  onSubmitUpdate={handleUpdateUser}
/>
      </Disclosure>
    );
  };
  
  export default Navbar;
  