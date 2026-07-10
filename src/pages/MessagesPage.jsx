import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Video, MoreVertical, Paperclip, Image as ImageIcon, MessageSquare, SquarePlay, 
  Smile, Mic, Send, Search, ChevronLeft, Check, CheckCheck,
  Info, BellOff, Trash2, Ban, PhoneCall
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { mockUsers } from '../data/mockUsers';

const MOCK_CURRENT_USER = {
  id: 'me',
  name: 'Smith Kadam',
  avatar: 'https://i.pravatar.cc/300?u=smithkadam'
};

const INITIAL_MESSAGES = [
  { id: 1, senderId: '1', text: 'Hi! I saw you\'re interested in React.', time: '10:00 AM', status: 'read', date: 'Today' },
  { id: 2, senderId: 'me', text: 'Yes! I\'d love to learn React Hooks.', time: '10:05 AM', status: 'read', date: 'Today' },
  { id: 3, senderId: '1', text: 'Great. Are you available this weekend?', time: '10:07 AM', status: 'read', date: 'Today' },
  { id: 4, senderId: 'me', text: 'Saturday evening works perfectly.', time: '10:15 AM', status: 'read', date: 'Today' },
  { id: 5, senderId: '1', text: 'Awesome! Let\'s exchange skills.', time: '10:20 AM', status: 'read', date: 'Today' },
];

export default function MessagesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  
  const activeUser = mockUsers.find(u => u.id === id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, id]);

  useEffect(() => {
    if (id && activeUser) {
      // Simulate changing chats by keeping some generic messages or regenerating them
      setMessages([
        { id: 1, senderId: activeUser.id, text: `Hey, this is ${activeUser.name}.`, time: '09:00 AM', status: 'read', date: 'Today' },
        { id: 2, senderId: 'me', text: 'Hello! Nice to connect with you.', time: '09:05 AM', status: 'read', date: 'Today' },
        { id: 3, senderId: activeUser.id, text: `I saw you want to learn ${activeUser.teaching[0] || 'skills'}. I can help!`, time: '09:10 AM', status: 'read', date: 'Today' },
      ]);
    }
  }, [id, activeUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeUser) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      date: 'Today'
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // Simulate read receipt
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m));
    }, 1500);

    // Simulate reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        senderId: activeUser.id,
        text: `That sounds great! Let's do it.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        date: 'Today'
      };
      setMessages(prev => [...prev, reply]);
    }, 3000);
  };

  const filteredUsers = mockUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex gap-6 h-[calc(100vh-73px)]">
        
        {/* Left Sidebar - Chat List */}
        <div className={`w-full lg:w-[380px] bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden ${id ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5BFF]/50 focus:border-[#5B5BFF] transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map(user => (
              <button
                key={user.id}
                onClick={() => navigate(`/messages/${user.id}`)}
                className={`w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${id === user.id ? 'bg-indigo-50/50 hover:bg-indigo-50/50' : ''}`}
              >
                <div className="relative shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  {user.status === 'Online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-800 truncate">{user.name}</h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap">10:20 AM</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">
                    {user.id === '1' ? "Awesome! Let's exchange skills." : `Can you help me with ${user.wants[0]}?`}
                  </p>
                </div>
                {user.id === '1' && id !== '1' && (
                  <div className="w-5 h-5 rounded-full bg-[#5B5BFF] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Area - Chat Window */}
        <div className={`flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden ${!id ? 'hidden lg:flex' : 'flex'}`}>
          {activeUser ? (
            <>
              {/* Chat Header */}
              <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <button onClick={() => navigate('/messages')} className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="relative cursor-pointer" onClick={() => navigate(`/profile/${activeUser.id}`)}>
                    <img src={activeUser.avatar} alt={activeUser.name} className="w-10 h-10 rounded-full object-cover" />
                    {activeUser.status === 'Online' && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 cursor-pointer hover:text-[#5B5BFF] transition-colors" onClick={() => navigate(`/profile/${activeUser.id}`)}>
                      {activeUser.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activeUser.status === 'Online' ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-[#5B5BFF] hover:bg-indigo-50 rounded-full transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-[#5B5BFF] hover:bg-indigo-50 rounded-full transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                <div className="flex justify-center mb-6">
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>
                
                <div className="space-y-4">
                  {messages.map((msg, idx) => {
                    const isMe = msg.senderId === 'me';
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[75%] ${isMe ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                          {!isMe && (
                            <img src={activeUser.avatar} alt="" className="w-8 h-8 rounded-full shrink-0" />
                          )}
                          <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <div className={`px-4 py-2.5 rounded-2xl ${
                              isMe 
                                ? 'bg-[#5B5BFF] text-white rounded-tr-sm' 
                                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm shadow-sm'
                            }`}>
                              <p className="text-[15px] leading-relaxed">{msg.text}</p>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[11px] text-slate-400 font-medium">{msg.time}</span>
                              {isMe && (
                                <CheckCheck className={`w-3.5 h-3.5 ${msg.status === 'read' ? 'text-blue-500' : 'text-slate-300'}`} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                  <div className="flex gap-1 pb-1">
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                      <Paperclip className="w-5 h-5" /></button><button type="button" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors font-bold text-xs flex items-center justify-center w-9 h-9">GIF
                    </button>
                  </div>
                  
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-center px-4">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 py-3 text-[15px]"
                    />
                    <button type="button" className="p-2 -mr-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {newMessage.trim() ? (
                    <button type="submit" className="w-12 h-12 bg-[#5B5BFF] text-white rounded-full flex items-center justify-center hover:bg-indigo-600 hover:shadow-lg transition-all active:scale-95 shrink-0">
                      <Send className="w-5 h-5 ml-1" />
                    </button>
                  ) : (
                    <button type="button" className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0">
                      <Mic className="w-5 h-5" />
                    </button>
                  )}
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50">
              <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Your Messages</h3>
              <p className="text-slate-500 text-center max-w-sm">
                Select a conversation from the sidebar to start chatting, or explore new profiles to connect.
              </p>
              <button onClick={() => navigate('/explore')} className="mt-8 px-6 py-2.5 bg-[#5B5BFF] text-white rounded-xl font-semibold shadow-md hover:bg-indigo-600 transition-colors">
                Explore Skills
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
