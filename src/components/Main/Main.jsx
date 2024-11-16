import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const {
        onSent,
        showResult,
        loading,
        setInput,
        input,
        chatHistory
    } = useContext(Context);

    // Example prompts array for better maintainability
    const examplePrompts = [
        "I'm so overwhelmed with work. There's too much on my plate.",
        "I just don't feel motivated to do anything.",
        "I'm stressed about my upcoming exams.",
        "don't feel good enough compared to others."
    ];

    // Handler for when an example prompt is clicked
    const handleExampleClick = (prompt) => {
        setInput(prompt);
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Kaira-AI</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {showResult ? (
                    <div className="result">
                        {chatHistory.map((item, index) => (
                            <div key={index} className={`chat-item ${item.type}`}>
                                <div className='chat-item-title'>
                                    <img src={item.type === 'user' ? assets.user_icon : assets.gemini_icon} alt="" />
                                    {item.type === 'user' && <p>You</p>}
                                </div>
                                <div className="chat-item-content">
                                    {item.type === 'user' ? (
                                        <p>{item.content}</p>
                                    ) : (
                                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="loader">
                                <hr className="animated-bg" />
                                <hr className="animated-bg" />
                                <hr className="animated-bg" />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="greet">
                            <p><span>Hello There!.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            {examplePrompts.map((prompt, index) => (
                                <div 
                                    key={index} 
                                    className="card"
                                    onClick={() => handleExampleClick(prompt)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <p>{prompt}</p>
                                    <img src={assets.bulb_icon} alt="" />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder='Enter a prompt here' 
                        />
                        <div>
                            {input && <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" />}
                        </div>
                    </div>
                    <p 
                        className="bottom-info"
                        onClick={handleTeamInfoClick}
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        Made by team INNOV8ORS nmamit
                    </p>

                    {showTeamInfo && (
                        <div className="team-info">
                            <h3>Team Members:</h3>
                            <ul>
                                <li>
                                    <a href="https://github.com/Madvith-d" target="_blank" rel="noopener noreferrer">
                                        Madvith
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/Ronit-Pai" target="_blank" rel="noopener noreferrer">
                                        Ronit Pai
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/mpriaanka" target="_blank" rel="noopener noreferrer">
                                        Priaanka
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/Ashil07" target="_blank" rel="noopener noreferrer">
                                        Ashil
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Main