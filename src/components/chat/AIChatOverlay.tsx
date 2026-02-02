import { useState, useEffect, useRef } from "react";
import { X, Mic, Plus, Bot, ChevronDown, Sparkles, Presentation, Network, FileText, GraduationCap, Wrench, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

interface AIChatOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export function AIChatOverlay({ isOpen, onClose, userName }: AIChatOverlayProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Focus input when opening
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Clear messages when closed
    useEffect(() => {
        if (!isOpen) {
            setMessages([]);
            setInputValue("");
            setIsTyping(false);
        }
    }, [isOpen]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI delay and response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: `Entendi sua solicitação sobre "${text}". Como sou uma demonstração de interface, ainda não posso processar dados reais, mas estou pronto para ser integrado ao backend!`,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage(inputValue);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="w-full max-w-[850px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col max-h-[85vh]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-6 right-6 rounded-full hover:bg-gray-50 z-10"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </Button>

                    <div className="flex flex-col h-full">
                        {/* Content Area */}
                        <div className={`flex-1 overflow-y-auto p-12 pb-4 scrollbar-hide ${messages.length > 0 ? '' : 'flex flex-col justify-center'}`}>
                            {messages.length === 0 ? (
                                /* Welcome View */
                                <div className="mb-8 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Bot className="w-6 h-6 text-[#9b87f5]" />
                                        {/* Using a purple/indigo color similar to the star in image */}
                                        <span className="text-xl font-semibold text-[#ff6b6b]">Olá, {userName}</span>
                                    </div>
                                    <h1 className="text-5xl font-medium text-[#1A1F2C] tracking-tight leading-tight">
                                        Por onde começamos?
                                    </h1>
                                </div>
                            ) : (
                                /* Chat History View */
                                <div className="space-y-6">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                {msg.sender === 'ai' && (
                                                    <div className="w-8 h-8 rounded-full bg-[#E5DEFF] flex items-center justify-center shrink-0">
                                                        <Bot className="w-4 h-4 text-[#7E69AB]" />
                                                    </div>
                                                )}
                                                <div
                                                    className={`p-4 rounded-2xl ${msg.sender === 'user'
                                                        ? 'bg-[#F1F0FB] text-[#1A1F2C] rounded-br-none'
                                                        : 'bg-white border border-gray-100 text-[#1A1F2C] rounded-bl-none shadow-sm'
                                                        }`}
                                                >
                                                    <p className="text-base leading-relaxed">{msg.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="flex gap-3 max-w-[80%]">
                                                <div className="w-8 h-8 rounded-full bg-[#E5DEFF] flex items-center justify-center shrink-0">
                                                    <Bot className="w-4 h-4 text-[#7E69AB]" />
                                                </div>
                                                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm">
                                                    <div className="flex gap-1">
                                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        {/* Input Area (Bottom) */}
                        <div className="p-12 pt-4 bg-white">
                            <div className={`relative bg-[#f0f4f9] rounded-[2rem] p-4 flex flex-col justify-between transition-all duration-300 ${messages.length > 0 ? 'min-h-[80px]' : 'min-h-[160px]'}`}>
                                <Input
                                    ref={inputRef}
                                    className="bg-transparent border-none shadow-none text-lg text-[#555] placeholder:text-gray-400 focus-visible:ring-0 px-2 h-auto py-2"
                                    placeholder="Pergunte ao Assistente..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />

                                {/* Input Actions */}
                                <div className="flex items-center justify-between mt-2 px-2">
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200/50 text-gray-500 w-8 h-8">
                                            <Plus className="w-5 h-5" />
                                        </Button>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-[#e2e7eb] px-4 py-2 rounded-full hover:bg-[#dbe0e4] cursor-pointer transition-colors">
                                            <Wrench className="w-4 h-4" />
                                            Ferramentas
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Show Send button when typing, otherwise show mic/options */}
                                        {inputValue.trim() ? (
                                            <Button
                                                size="icon"
                                                className="rounded-full bg-[#1A1F2C] hover:bg-black text-white w-10 h-10 transition-all"
                                                onClick={() => handleSendMessage(inputValue)}
                                            >
                                                <Send className="w-5 h-5" />
                                            </Button>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                                                    Raciocínio
                                                    <ChevronDown className="w-4 h-4" />
                                                </div>
                                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200/50 text-gray-500 w-8 h-8">
                                                    <Mic className="w-5 h-5" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Chips / Suggestions (Only in Welcome View) */}
                            {messages.length === 0 && (
                                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                                    <SuggestionChip
                                        icon={Presentation}
                                        label="Criar apresentação"
                                        color="text-[#B88700]" // Darker yellow
                                        bgColor="bg-[#FFF9E5]" // Light yellow
                                        onClick={() => handleSendMessage("Como criar uma apresentação?")}
                                    />
                                    <SuggestionChip
                                        icon={Network}
                                        label="Criar mapa mental"
                                        color="text-[#0056D2]" // Darker blue
                                        bgColor="bg-[#E8F2FF]" // Light blue
                                        onClick={() => handleSendMessage("Crie um mapa mental para mim")}
                                    />
                                    <SuggestionChip
                                        icon={FileText}
                                        label="Faça um resumo"
                                        color="text-[#7E22CE]" // Darker purple
                                        bgColor="bg-[#F3E8FF]" // Light purple
                                        onClick={() => handleSendMessage("Pode fazer um resumo?")}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function SuggestionChip({ icon: Icon, label, color, bgColor, onClick }: { icon: any, label: string, color: string, bgColor: string, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] ${bgColor} hover:brightness-95 transition-all duration-200 whitespace-nowrap`}
        >
            <Icon className={`w-5 h-5 ${color}`} />
            <span className={`text-sm font-medium ${color}`}>{label}</span>
        </button>
    );
}
