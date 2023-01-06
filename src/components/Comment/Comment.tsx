import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from '../Avatar/Avatar'
import styles from './Comment.module.css'

interface CommentProps {
  content: string;
  onDeleteComment: (commentToDelete: string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  // closures
  function handleLikeComment() {
    setLikeCount((state) => {     
      return state + 1
    })
   
    // trabalhando com valor atualizado de likeCount
    setLikeCount((state) => {     
      console.log(state)
      return state
    })   
  }

  return (
    <div className={styles.comment}>
       <Avatar hasBorder={false} src="https://github.com/ArthurKVasque07.png" alt="Foto" />

       <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Arthur</strong>
              <time title='Publicado em 11 de maio ás 8:13h' dateTime='2022-05-11 08:13:30'>Cerca de 1h atrás</time>
            </div>
            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
       </div>
    </div>
  )
}