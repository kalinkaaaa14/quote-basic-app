import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import AddQuote from "../models/AddQuote";

const NewQuote = () => {
    const { sendRequest, status } = useHttp(addQuote);
    const history = useHistory();

    useEffect(() => {
        if (status === 'completed') {
            history.push('/quotes');
        }
    }, [status, history]);

    const addQuoteHandler = (quoteData:AddQuote) => {
        sendRequest(quoteData);
    };

    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
