import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, User, Bot } from "lucide-react";
import { Link } from "wouter";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

export default function AIHelper() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Namaste! I am your AI Health Assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let responseText = "Sure, I can help you with that.";
      const lowerInput = newUserMessage.text.toLowerCase();

      if (lowerInput.includes("doctor") || lowerInput.includes("appointment")) {
        responseText = "You can book a doctor appointment easily. Click the 'Book Doctor Appointment' button in the menu.";
      } else if (lowerInput.includes("medicine") || lowerInput.includes("order") || lowerInput.includes("pill")) {
        responseText = "Need medicines? Go to the 'Order Medicines' section to place an order for home delivery.";
      } else if (lowerInput.includes("pain") || lowerInput.includes("hurt") || lowerInput.includes("sick")) {
        responseText = "I'm sorry to hear you're in pain. Please book a consultation with a specialist immediately using the 'Book Doctor' page.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        responseText = "Hello! How are you feeling today?";
      } else if (lowerInput.includes("thank")) {
        responseText = "You are very welcome! Stay healthy.";
      }

      const newAiMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai'
      };

      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-200px)] min-h-[500px] flex flex-col">
      <div className="bg-violet-600 text-white p-6 rounded-t-3xl shadow-lg flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-xl">
          <MessageCircle className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Health Helper</h2>
          <p className="text-violet-100 text-base">Always here to answer your questions</p>
        </div>
      </div>

      <div className="flex-grow bg-white border-x border-b border-slate-200 shadow-lg p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              msg.sender === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-violet-100 text-violet-600'
            }`}>
              {msg.sender === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </div>
            
            <div className={`p-4 rounded-2xl max-w-[80%] text-lg leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                : 'bg-violet-50 text-slate-800 border border-violet-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
             <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
               <Bot className="w-6 h-6" />
             </div>
             <div className="bg-violet-50 border border-violet-100 p-4 rounded-2xl rounded-tl-none text-slate-500 italic">
               Typing...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-slate-100 p-4 rounded-b-3xl border-x border-b border-slate-200 shadow-lg">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            className="flex-grow p-4 text-xl border-2 border-slate-300 rounded-xl focus:border-violet-600 focus:ring-2 focus:ring-violet-100 transition-all"
          />
          <button 
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-xl transition-colors flex items-center justify-center"
          >
            <Send className="w-8 h-8" />
          </button>
        </form>
      </div>
    </div>
  );
}
