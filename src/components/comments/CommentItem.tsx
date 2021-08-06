// @ts-ignore
import classes from './CommentItem.module.css';

const CommentItem:React.FC<{key:string, text:string}> = (props) => {
    return (
        <li className={classes.item}>
            <p>{props.text}</p>
        </li>
    );
};

export default CommentItem;