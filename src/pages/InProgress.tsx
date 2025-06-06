
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import PlaylistItem from '@/components/podcast/PlaylistItem';
import { motion } from 'framer-motion';
import { getInProgressEpisodes } from '@/lib/podcast-service';

const InProgress = () => {
  const { data: inProgressEpisodes = [], isLoading } = useQuery({
    queryKey: ['inProgressEpisodes'],
    queryFn: getInProgressEpisodes
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold mb-2">Em Progresso</h1>
          <p className="text-juricast-muted">Continue de onde parou</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-juricast-card animate-pulse rounded-lg h-16"></div>
            ))}
          </div>
        ) : inProgressEpisodes.length > 0 ? (
          <motion.div
            className="space-y-3 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {inProgressEpisodes.map((episode, index) => (
              <motion.div key={episode.id} variants={itemVariants}>
                <PlaylistItem
                  episode={episode}
                  index={index + 1}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center h-64 bg-juricast-card rounded-lg p-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-semibold mb-2">Nenhum episódio em progresso</h2>
            <p className="text-juricast-muted text-center mb-4">
              Você ainda não começou a ouvir nenhum episódio. 
              Comece a explorar o catálogo e seus episódios começados aparecerão aqui.
            </p>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default InProgress;
