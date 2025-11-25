import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, MessageCircle, MoreVertical } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Paulo Silva',
      avatar: 'https://images.unsplash.com/photo-1570626742839-59acd9822944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwYXV0aG9yJTIwZGVza3xlbnwxfHx8fDE3NjIwMDUyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      content: 'Excelente análise! Realmente o cinema de arte está passando por um momento incrível. Recentemente assisti a alguns filmes independentes que me marcaram profundamente.',
      timestamp: 'Há 2 horas',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          author: 'Marina Costa',
          avatar: 'https://images.unsplash.com/photo-1570626742839-59acd9822944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwYXV0aG9yJTIwZGVza3xlbnwxfHx8fDE3NjIwMDUyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
          content: 'Concordo! Quais filmes você recomendaria?',
          timestamp: 'Há 1 hora',
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: '2',
      author: 'Juliana Fernandes',
      avatar: 'https://images.unsplash.com/photo-1570626742839-59acd9822944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwYXV0aG9yJTIwZGVza3xlbnwxfHx8fDE3NjIwMDUyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      content: 'Adorei a menção às novas vozes no cinema. A diversidade de perspectivas está tornando a produção muito mais rica e interessante.',
      timestamp: 'Há 5 horas',
      likes: 8,
      isLiked: false
    },
    {
      id: '3',
      author: 'Roberto Andrade',
      avatar: 'https://images.unsplash.com/photo-1570626742839-59acd9822944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwYXV0aG9yJTIwZGVza3xlbnwxfHx8fDE3NjIwMDUyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      content: 'Seria interessante ver uma matéria sobre os festivais que estão dando espaço para esses novos cineastas.',
      timestamp: 'Há 1 dia',
      likes: 15,
      isLiked: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (isReply && comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === commentId
                ? {
                    ...reply,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                    isLiked: !reply.isLiked
                  }
                : reply
            )
          };
        }
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      })
    );
  };

  const CommentItem = ({ 
    comment, 
    isReply = false, 
    parentId 
  }: { 
    comment: Comment; 
    isReply?: boolean; 
    parentId?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isReply ? 'ml-12' : ''}`}
    >
      <div className="flex space-x-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F5F5] flex-shrink-0">
          <ImageWithFallback
            src={comment.avatar}
            alt={comment.author}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="bg-[#FAFAFA] rounded-2xl px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#2C2C2C]">
                {comment.author}
              </span>
              <button className="text-[#404040] hover:text-[#722F37] transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[#404040] leading-relaxed">
              {comment.content}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-2 ml-5">
            <button
              onClick={() => handleLike(comment.id, isReply, parentId)}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                comment.isLiked ? 'text-[#722F37]' : 'text-[#404040] hover:text-[#722F37]'
              }`}
            >
              <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
              <span>{comment.likes}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center space-x-1 text-sm text-[#404040] hover:text-[#722F37] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Responder</span>
              </button>
            )}

            <span className="text-sm text-[#404040]">{comment.timestamp}</span>
          </div>

          {/* Reply Input */}
          <AnimatePresence>
            {replyingTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 ml-5"
              >
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#722F37] flex items-center justify-center text-white text-sm flex-shrink-0">
                    U
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Escreva sua resposta..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#722F37] transition-colors"
                      rows={2}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-4 py-2 text-sm text-[#404040] hover:text-[#2C2C2C] transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-4 py-2 text-sm bg-[#722F37] text-white hover:bg-[#8B3A42] transition-colors"
                      >
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  parentId={comment.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl text-[#2C2C2C] mb-8">
        Comentários ({comments.length})
      </h2>

      {/* New Comment Input */}
      <div className="mb-12">
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#722F37] flex items-center justify-center text-white flex-shrink-0">
            U
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Compartilhe sua opinião sobre este artigo..."
              className="w-full px-5 py-4 bg-[#FAFAFA] border border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-[#722F37] transition-colors"
              rows={4}
            />
            <div className="flex justify-end mt-3">
              <button className="px-6 py-3 bg-[#722F37] text-white hover:bg-[#8B3A42] transition-colors">
                Publicar Comentário
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}
