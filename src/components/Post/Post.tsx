import { format, formatDistanceToNow } from 'date-fns'
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react'
import { Avatar } from '../Avatar/Avatar'
import {Comment} from '../Comment/Comment'
import styles from './Post.module.css'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({author, publishedAt, content}: PostProps) {
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState(['post mt legal']);
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'")

  const publishedDateRelativerToNow = formatDistanceToNow(publishedAt, {    
    addSuffix: true
  })

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()    
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function newCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Campo required')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })
    setComments(commentsWithoutDeleteOne)
  }

  const newCommentsEmpty = newCommentText.length <= 0;

  return (
   <article className={styles.post}>
    <header>
      <div className={styles.author}>
        <Avatar src={author.avatarUrl} alt="Foto" />
        <div className={styles.authorInfo}>
          <strong>{author.name}</strong>
          <span>{author.role}</span>
        </div>
      </div>
      <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativerToNow}</time>
    </header>

    <div className={styles.content}>   
      {content.map(line => {
         if(line.type === 'paragraph') {
          return <p key={line.content}>{line.content}</p>
         } else if (line.type === 'link') {
          return <p key={line.content}><a>{line.content}</a></p>
         }          
      })}
    </div>

    <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
      <strong>Deixe seu feedback</strong>

      <textarea placeholder='Deixe um comentario' name='comment' onChange={handleNewCommentChange} value={newCommentText} required onInvalid={newCommentInvalid} />

      <footer>
        <button disabled={newCommentsEmpty} type='submit'>Publicar</button>
      </footer>
    </form>

    <div className={styles.commentList}>
      {comments.map(comment => {
        return <Comment key={comment} content={comment} onDeleteComment={() => deleteComment(comment)} />
      })}    
    </div>
   </article>
  )
}
