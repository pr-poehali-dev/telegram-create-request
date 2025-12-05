import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  pinned?: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
  read: boolean;
}

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const chats: Chat[] = [
    { id: 1, name: 'Telegram', lastMessage: 'Добро пожаловать! Это официальный канал новостей.', time: '12:45', unread: 0, avatar: 'TG', online: false, pinned: true },
    { id: 2, name: 'Рабочая группа', lastMessage: 'Алексей: Готово, отправил файлы', time: '11:23', unread: 3, avatar: 'РГ', online: true, pinned: true },
    { id: 3, name: 'Мама ❤️', lastMessage: 'Не забудь позвонить вечером', time: 'Вчера', unread: 1, avatar: 'М', online: true },
    { id: 4, name: 'Друзья', lastMessage: 'Фото', time: 'Вчера', unread: 0, avatar: 'Д', online: false },
    { id: 5, name: 'Александр', lastMessage: 'Отлично, созвонимся завтра', time: '15.11', unread: 0, avatar: 'А', online: true },
    { id: 6, name: 'Спорт и здоровье', lastMessage: 'Кто идёт на тренировку завтра?', time: '14.11', unread: 0, avatar: 'СЗ', online: false },
    { id: 7, name: 'IT новости', lastMessage: 'Новый релиз React 19', time: '13.11', unread: 5, avatar: 'IT', online: false },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как дела?', time: '10:30', sent: false, read: true },
    { id: 2, text: 'Отлично! Работаю над новым проектом', time: '10:32', sent: true, read: true },
    { id: 3, text: 'Звучит интересно! Расскажешь подробнее?', time: '10:33', sent: false, read: true },
    { id: 4, text: 'Конечно! Это веб-приложение на React', time: '10:35', sent: true, read: true },
    { id: 5, text: 'С возможностью работы офлайн', time: '10:35', sent: true, read: true },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="h-screen flex flex-col bg-background">
      {!isOnline && (
        <div className="bg-yellow-500 text-white text-center py-2 text-sm">
          <Icon name="WifiOff" className="w-4 h-4 inline mr-2" />
          Нет соединения. Приложение работает в офлайн-режиме
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-96 border-r bg-muted/30`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between mb-3">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                  <Icon name="X" className="w-5 h-5" />
                </Button>
                <h1 className="text-xl font-semibold">Telegram</h1>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Icon name="Settings" className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-muted/50"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="divide-y">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      setSelectedChat(chat.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedChat === chat.id ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {chat.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{chat.name}</h3>
                            {chat.pinned && <Icon name="Pin" className="w-3 h-3 text-muted-foreground" />}
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{chat.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <Badge className="ml-2 bg-primary text-primary-foreground rounded-full px-2 h-5 text-xs">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className={`${!isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col flex-1`}>
          {selectedChat ? (
            <>
              <div className="p-4 border-b bg-background flex items-center gap-3">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                  <Icon name="Menu" className="w-5 h-5" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {currentChat?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="font-semibold">{currentChat?.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {currentChat?.online ? 'в сети' : 'был(а) недавно'}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Icon name="Phone" className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4 bg-muted/20">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sent
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-card rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-xs opacity-70">{msg.time}</span>
                          {msg.sent && (
                            <Icon
                              name={msg.read ? 'CheckCheck' : 'Check'}
                              className="w-4 h-4 opacity-70"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-background">
                <div className="flex gap-2 max-w-4xl mx-auto">
                  <Button variant="ghost" size="icon">
                    <Icon name="Paperclip" className="w-5 h-5" />
                  </Button>
                  <Input
                    placeholder="Написать сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Icon name="Smile" className="w-5 h-5" />
                  </Button>
                  {messageText ? (
                    <Button size="icon" onClick={handleSendMessage}>
                      <Icon name="Send" className="w-5 h-5" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="icon">
                      <Icon name="Mic" className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <Icon name="MessageCircle" className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Выберите чат</h2>
                <p className="text-muted-foreground">
                  Выберите диалог из списка слева
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
