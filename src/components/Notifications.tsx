import { useState, Fragment } from "react";
import { FiBell, FiX } from "react-icons/fi";
import { Popover, Transition } from "@headlessui/react";

const mockNotifications = [
  {
    id: 1,
    title: "New message from John",
    message: "Hey! Are we still meeting tomorrow?",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Project updated",
    message: "The design files have been updated",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Payment received",
    message: "Your payment of $150 was successful",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "New comment",
    message: "Sarah commented on your post",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 5,
    title: "Meeting reminder",
    message: "Team standup in 30 minutes",
    time: "6 hours ago",
    read: false,
  },
  {
    id: 6,
    title: "Task assigned",
    message: 'You have been assigned to "Homepage Redesign"',
    time: "1 day ago",
    read: true,
  },
  {
    id: 7,
    title: "System update",
    message: "New features are now available",
    time: "2 days ago",
    read: true,
  },
  {
    id: 8,
    title: "Welcome aboard!",
    message: "Thanks for joining our platform",
    time: "3 days ago",
    read: true,
  },
  {
    id: 9,
    title: "File uploaded",
    message: "Document.pdf uploaded successfully",
    time: "4 days ago",
    read: true,
  },
  {
    id: 10,
    title: "Deadline approaching",
    message: "Project deadline is in 2 days",
    time: "5 days ago",
    read: false,
  },
];

const UserNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id:number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id:number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <Popover className="relative">
      {({  }) => (
        <>
          <Popover.Button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors">
            <FiBell className="w-4 h-4 cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-[1px] flex h-2 w-2 items-center justify-center rounded-full bg-red-700 font-semibold text-white">
              </span>
            )}
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
            <Popover.Panel className="absolute -right-10 lg:right-0 z-10 mt-2 w-80 lg:w-96 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`group p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-50 ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500" />
                              )}
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {notification.title}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default UserNotifications;
