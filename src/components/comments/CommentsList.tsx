
// @ts-ignore
import classes from './CommentsList.module.css';

import Comment from "../../models/Comment";
import React from "react";
import CommentItem from "./CommentItem";
const CommentsList:React.FC<{comments:Comment[]}> = (props) => {
    return (
        <ul className={classes.comments}>
            {props.comments.map((comment) => (
                <CommentItem key={comment.id} text={comment.text} />
            ))}
        </ul>
    );
};

export default CommentsList;
