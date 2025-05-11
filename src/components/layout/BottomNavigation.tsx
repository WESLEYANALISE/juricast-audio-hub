
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Heart, Bookmark, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Clock, label: "Progresso", href: "/em-progresso" },
    { icon: Check, label: "Concluídos", href: "/concluidos" },
    { icon: Heart, label: "Favoritos", href: "/favoritos" }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-40 pb-safe flex justify-center"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="w-full max-w-md mx-auto bg-juricast-card/80 backdrop-blur-lg border border-white/10 rounded-t-xl px-6 py-3 shadow-xl">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = path === item.href || 
                           (item.href === "/em-progresso" && path.includes("/em-progresso")) ||
                           (item.href === "/favoritos" && path.includes("/favoritos")) ||
                           (item.href === "/concluidos" && path.includes("/concluidos"));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.label}
                to={item.href}
                className="flex flex-col items-center relative px-4"
              >
                <motion.div
                  className={cn(
                    "p-2 rounded-full transition-all",
                    isActive 
                      ? "bg-juricast-accent text-juricast-text" 
                      : "text-juricast-muted hover:text-juricast-text"
                  )}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                  {isActive && (
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                      layoutId="navIndicator"
                    />
                  )}
                </motion.div>
                <span className={cn(
                  "text-xs mt-1",
                  isActive ? "text-juricast-text" : "text-juricast-muted"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
