import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Section = 'commands' | 'profile' | 'search' | 'notifications' | 'help';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('commands');
  const [searchQuery, setSearchQuery] = useState('');

  const commands = [
    { id: 1, name: '/start', description: 'Запустить бота', icon: 'Zap', color: 'neon-purple' },
    { id: 2, name: '/help', description: 'Получить помощь', icon: 'LifeBuoy', color: 'neon-blue' },
    { id: 3, name: '/settings', description: 'Настройки бота', icon: 'Settings', color: 'neon-pink' },
    { id: 4, name: '/tasks', description: 'Управление задачами', icon: 'CheckSquare', color: 'neon-purple' },
    { id: 5, name: '/analytics', description: 'Аналитика и статистика', icon: 'BarChart3', color: 'neon-blue' },
    { id: 6, name: '/profile', description: 'Ваш профиль', icon: 'User', color: 'neon-pink' },
  ];

  const notifications = [
    { id: 1, text: 'Новое задание добавлено', time: '2 мин назад', type: 'info' },
    { id: 2, text: 'Задача выполнена успешно', time: '15 мин назад', type: 'success' },
    { id: 3, text: 'Требуется ваше внимание', time: '1 час назад', type: 'warning' },
    { id: 4, text: 'Система обновлена до v2.0', time: '3 часа назад', type: 'info' },
  ];

  const navigationItems = [
    { id: 'commands' as Section, icon: 'Terminal', label: 'Команды' },
    { id: 'profile' as Section, icon: 'User', label: 'Профиль' },
    { id: 'search' as Section, icon: 'Search', label: 'Поиск' },
    { id: 'notifications' as Section, icon: 'Bell', label: 'Уведомления' },
    { id: 'help' as Section, icon: 'HelpCircle', label: 'Помощь' },
  ];

  const renderCommands = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {commands.map((cmd, index) => (
        <Card
          key={cmd.id}
          className="glass-effect hover-lift cursor-pointer p-6 border-2 border-primary/20 transition-all duration-300 hover:border-primary/50 neon-glow"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-${cmd.color}/20`}>
              <Icon name={cmd.icon} className={`w-6 h-6 text-${cmd.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{cmd.name}</h3>
              <p className="text-sm text-muted-foreground">{cmd.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="animate-slide-up space-y-6">
      <Card className="glass-effect p-8 border-2 border-primary/20 neon-glow">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Icon name="User" className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Пользователь #1337</h2>
            <Badge className="bg-primary/20 text-primary border-primary/30">Pro уровень</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Прогресс задач</span>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="glass-effect p-4 rounded-lg text-center">
              <Icon name="Zap" className="w-6 h-6 mx-auto mb-2 text-neon-purple" />
              <div className="text-2xl font-bold">248</div>
              <div className="text-xs text-muted-foreground">Команд выполнено</div>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <Icon name="TrendingUp" className="w-6 h-6 mx-auto mb-2 text-neon-blue" />
              <div className="text-2xl font-bold">89%</div>
              <div className="text-xs text-muted-foreground">Успешность</div>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <Icon name="Award" className="w-6 h-6 mx-auto mb-2 text-neon-pink" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground">Достижений</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSearch = () => (
    <div className="animate-fade-in space-y-4">
      <Card className="glass-effect p-6 border-2 border-primary/20">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск команд, настроек, функций..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-primary/20 focus:border-primary/50 h-12"
          />
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground px-2">Популярные запросы</h3>
        {['Создать задачу', 'Настройки уведомлений', 'Экспорт данных', 'История команд'].map((query, index) => (
          <Card
            key={index}
            className="glass-effect p-4 hover-lift cursor-pointer border border-primary/10 hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <Icon name="Clock" className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{query}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="animate-slide-up space-y-3">
      {notifications.map((notif, index) => (
        <Card
          key={notif.id}
          className="glass-effect p-5 hover-lift cursor-pointer border border-primary/10 hover:border-primary/30 transition-all"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${
              notif.type === 'success' ? 'bg-green-500/20' :
              notif.type === 'warning' ? 'bg-yellow-500/20' :
              'bg-blue-500/20'
            }`}>
              <Icon
                name={
                  notif.type === 'success' ? 'CheckCircle' :
                  notif.type === 'warning' ? 'AlertTriangle' :
                  'Info'
                }
                className={`w-5 h-5 ${
                  notif.type === 'success' ? 'text-green-400' :
                  notif.type === 'warning' ? 'text-yellow-400' :
                  'text-blue-400'
                }`}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">{notif.text}</p>
              <p className="text-xs text-muted-foreground">{notif.time}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderHelp = () => (
    <div className="animate-fade-in space-y-4">
      <Card className="glass-effect p-6 border-2 border-primary/20 neon-glow">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <Icon name="Book" className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Документация</h3>
            <p className="text-sm text-muted-foreground">Полное руководство пользователя</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Быстрый старт', icon: 'Rocket', desc: 'Начните работу за 5 минут' },
          { title: 'FAQ', icon: 'MessageCircle', desc: 'Часто задаваемые вопросы' },
          { title: 'Поддержка', icon: 'HeadphonesIcon', desc: 'Свяжитесь с нашей командой' },
          { title: 'Обновления', icon: 'Sparkles', desc: 'Новые функции и улучшения' },
        ].map((item, index) => (
          <Card
            key={index}
            className="glass-effect p-5 hover-lift cursor-pointer border border-primary/10 hover:border-primary/30 transition-all"
          >
            <Icon name={item.icon} className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-semibold mb-1">{item.title}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'commands':
        return renderCommands();
      case 'profile':
        return renderProfile();
      case 'search':
        return renderSearch();
      case 'notifications':
        return renderNotifications();
      case 'help':
        return renderHelp();
      default:
        return renderCommands();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent animate-pulse-glow">
              <Icon name="Bot" className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Assistant Bot
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Универсальный помощник для автоматизации задач</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-slide-up">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'outline'}
              className={`gap-2 transition-all ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground neon-glow'
                  : 'glass-effect hover-lift border-primary/20 hover:border-primary/50'
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon name={item.icon} className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </div>

        <div className="mt-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Index;
