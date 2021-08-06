import { Fragment, useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';


// @ts-ignore
import classes from './QuoteForm.module.css';
import AddQuote from "../../models/AddQuote";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
const QuoteForm:React.FC<{
    onAddQuote:(quote:AddQuote)=>void,
    isLoading:boolean}> = (props) => {
    const [isEntering, setIsEntering] = useState(false);

    const authorInputRef = useRef<HTMLInputElement>(null);
    const textInputRef = useRef<HTMLTextAreaElement>(null);

    function submitFormHandler(event:React.FormEvent) {
        event.preventDefault();

        const enteredAuthor = authorInputRef.current!.value;
        const enteredText = textInputRef.current!.value;

        // todo validation

        props.onAddQuote({ author: enteredAuthor, text: enteredText });
    }

    const finishEnteringHandler = () => {
        setIsEntering(false);
    };

    const formFocusedHandler = () => {
        setIsEntering(true);
    };

    return (
        <Fragment>
            <Prompt
                when={isEntering}
                message={(location) =>
                    'Are you sure you want to leave? All your entered data will be lost!'
                }
            />
            <Card>
                <form
                    onFocus={formFocusedHandler}
                    className={classes.form}
                    onSubmit={submitFormHandler}
                >
                    {props.isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner />
                        </div>
                    )}

                    <div className={classes.control}>
                        <label htmlFor='author'>Author</label>
                        <input type='text' id='author' ref={authorInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='text'>Text</label>
                        <textarea id='text' rows={5} ref={textInputRef}/>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={finishEnteringHandler} className='btn'>Add Quote</button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default QuoteForm;
