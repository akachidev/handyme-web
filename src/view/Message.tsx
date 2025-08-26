import React, { useState } from "react";
import { MessageCircle, Phone, Archive, Trash2 } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

const Messages = () => {
  const [messages] = useState([
    {
      id: 1,
      name: "Miracle Workman",
      message: "Good morning! How can I help you today?",
      time: "10:30 AM",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=40&h=40&fit=crop&crop=face",
      unread: true,
      online: true,
    },
    {
      id: 2,
      name: "James Wilson",
      message: "Thank you for the quick response!",
      time: "9:45 AM",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      unread: false,
      online: true,
    },
    {
      id: 3,
      name: "Sarah Davis",
      message: "Is the service available this weekend?",
      time: "Yesterday",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      unread: false,
      online: false,
    },
    {
      id: 4,
      name: "Michael Brown",
      message: "Perfect! I'll be there at 2 PM",
      time: "Yesterday",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      unread: false,
      online: false,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  return (
    <div className="flex h-[90vh] bg-white rounded-xl overflow-hidden">
      <div className="w-80 border-r border-gray-200 flex flex-col ">
        <div className="p-4 border-b border-gray-200 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#363636]">Messages</h2>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Archive className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                selectedMessage.id === message.id
                  ? "bg-blue-50 border-r-2 border-[#00C2A8]"
                  : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={message.avatar}
                    alt={message.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {message.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-[#363636] truncate">
                      {message.name}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {message.message}
                  </p>
                  {message.unread && (
                    <div className="w-2 h-2 bg-[#00C2A8] rounded-full mt-1"></div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={selectedMessage.avatar}
                  alt={selectedMessage.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {selectedMessage.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-[#363636]">
                  {selectedMessage.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedMessage.online ? "Active now" : "Last seen recently"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Archive className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-700">
                    Hi there! I hope you're doing well today. I wanted to reach
                    out about the service you requested.
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">10:28 AM</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-xs lg:max-w-md">
                <div className="bg-[#00C2A8] p-3 rounded-lg text-white">
                  <p className="text-sm">
                    Thanks for reaching out! Yes, I'm interested in learning
                    more about what you offer.
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  10:29 AM
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-700">
                    {selectedMessage.message}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedMessage.time}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 text-black bg-white px-4 py-2 border border-[#CBD5E1] rounded-xl shadow-full focus:ring-2 focus:ring-[#00C2A8] focus:border-transparent outline-none"
            />
            <button className="bg-[#00C2A8] text-white p-2 rounded-lg hover:bg-[#00A896] transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Message: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F7F9FA] flex">
        <div className="flex-1 ml-16 sm:ml-16 md:ml-20 mr-0 lg:mr-6 md:mr-4 sm:mr-2">
          <Messages />
        </div>
      </div>
    </MainLayout>
  );
};

export default Message;
