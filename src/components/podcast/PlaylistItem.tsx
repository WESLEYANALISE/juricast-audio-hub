
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart, Pause, Gavel, Book, Scale, File, Check } from 'lucide-react';
import { PodcastEpisode } from '@/lib/types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toggleFavorite } from '@/lib/podcast-service';

interface PlaylistItemProps {
  episode: PodcastEpisode;
  index: number;
  isPlaying?: boolean;
  onPlay?: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ 
  episode, 
  index, 
  isPlaying = false,
  onPlay 
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(episode.id);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlay) onPlay();
  };

  // Helper function to return appropriate area icon
  const getAreaIcon = () => {
    const areaLower = episode.area.toLowerCase();
    
    if (areaLower.includes('civil')) return <Book size={16} className="text-juricast-accent" />;
    if (areaLower.includes('penal') || areaLower.includes('criminal')) return <Gavel size={16} className="text-juricast-accent" />;
    if (areaLower.includes('constituc')) return <Scale size={16} className="text-juricast-accent" />;
    return <File size={16} className="text-juricast-accent" />;
  };

  // Check if episode is completed (100%)
  const isCompleted = episode.progresso === 100;

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="bg-juricast-card hover:bg-juricast-card/80 rounded-lg overflow-hidden"
    >
      <Link to={`/podcast/${episode.id}`} className="flex items-center p-3">
        <div className="w-10 text-center text-juricast-muted mr-3">
          {index}
        </div>
        
        <div className="h-12 w-12 relative rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={episode.imagem_miniatura} 
            alt={episode.titulo} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-juricast-accent/90"
              onClick={handlePlay}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </motion.button>
          </div>
          {isCompleted && (
            <div className="absolute top-0 right-0 bg-green-500 p-1 rounded-bl-md">
              <Check size={12} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 ml-4 mr-2 overflow-hidden">
          <h3 className="font-medium text-sm line-clamp-2 sm:line-clamp-1">{episode.titulo}</h3>
          <div className="flex items-center text-juricast-accent text-xs gap-1">
            {getAreaIcon()}
            <span className="truncate">{episode.area} - {episode.tema}</span>
          </div>
          
          {episode.progresso && episode.progresso > 0 && episode.progresso < 100 && (
            <div className="mt-1 w-full h-1 bg-juricast-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-juricast-accent rounded-full" 
                style={{ width: `${episode.progresso}%` }}
              />
            </div>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "p-2 rounded-full", 
            episode.favorito ? "text-juricast-accent" : "text-juricast-muted"
          )}
          onClick={handleToggleFavorite}
        >
          <Heart size={18} fill={episode.favorito ? "currentColor" : "none"} />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default PlaylistItem;
