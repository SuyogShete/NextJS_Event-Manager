import classes from './comment-list.module.css';

function CommentList(props) {

  const {filteredComments} = props;

  return (
    <ul className={classes.comments}>
      {filteredComments.map(comment => <li key={comment._id}><p>{comment.commentText}</p><div>By <address>{comment.userName}</address></div></li>)}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;