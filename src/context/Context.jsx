import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")
    const [chatHistory, setChatHistory] = useState([]);

    function delayPara(index, nextWord) {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const onSent = async (prompt) => {
        setLoading(true);
        setShowResult(true);
        let response;
        let newPrompt = prompt !== undefined ? prompt : input;

        setPrevPrompts(prev => [...prev, newPrompt]);
        setRecentPrompt(newPrompt);
        response = await runChat(newPrompt);

        let formattedResponse = formatResponse(response);

        setChatHistory(prev => [...prev, 
            { type: 'user', content: newPrompt },
            { type: 'bot', content: formattedResponse }
        ]);

        setLoading(false);
        setInput("");
    }

    const formatResponse = (response) => {
        let responseArray = response.split('**');
        let newArray = responseArray.map((item, index) => 
            index % 2 === 1 ? `<b>${item}</b>` : item
        ).join('');
        return newArray.split('*').join("<br/>");
    }

    const newChat = async () => {
        setLoading(false);
        setShowResult(false);
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        chatHistory,
        setChatHistory
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
