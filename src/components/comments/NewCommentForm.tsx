import { useRef, useEffect } from 'react';

// @ts-ignore
import classes from './NewCommentForm.module.css';
import useHttp from "../../hooks/use-http";
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
const NewCommentForm:React.FC<{onAddedComment:()=>void,
quoteId:string}> = (props) => {
    const commentTextRef = useRef<HTMLTextAreaElement>(null);

    const { sendRequest, status, error } = useHttp(addComment);

    const { onAddedComment } = props;

    useEffect(() => {
        if (status === 'completed' && !error) {
            onAddedComment();
        }
    }, [status, error, onAddedComment]);

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = commentTextRef.current!.value;

        // todo - validation

        sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId });
    };

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            {status === 'pending' && (
                <div className='centered'>
                    <LoadingSpinner />
                </div>
            )}
            <div className={classes.control} onSubmit={submitFormHandler}>
                <label htmlFor='comment'>Your Comment</label>
                <textarea id='comment' rows={5} ref={commentTextRef}/>
            </div>
            <div className={classes.actions}>
                <button className='btn'>Add Comment</button>
            </div>
        </form>
    );
};

export default NewCommentForm;
