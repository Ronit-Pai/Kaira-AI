import React, { useContext, useState, useEffect } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import AudioRecorder from '../AudioRecorder/AudioRecorder'
import TextToSpeech from '../TextToSpeech/TextToSpeech'

const Main = () => {
    const {
        onSent,
        showResult,
        loading,
        setInput,
        input,
        chatHistory
    } = useContext(Context);

    const [showTeamInfo, setShowTeamInfo] = useState(false);

    const handleTeamInfoClick = () => {
        setShowTeamInfo(!showTeamInfo);
    };

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

    const handleTranscription = (transcription) => {
        if (transcription) {
            setInput(transcription);
            onSent(transcription);
        } else {
            // Handle empty transcription
            alert('Could not transcribe audio. Please try again.');
        }
    };

    // Add this new state for GitHub profile images
    const [teamProfiles, setTeamProfiles] = useState({
        'Madvith-d': null,
        'Ronit-Pai': null,
        'mpriaanka': null,
        'Ashil07': null
    });

    // Add this useEffect to fetch GitHub profile images
    useEffect(() => {
        const fetchGitHubProfiles = async () => {
            const profiles = { ...teamProfiles };
            for (let username of Object.keys(profiles)) {
                try {
                    const response = await fetch(`https://api.github.com/users/${username}`);
                    const data = await response.json();
                    profiles[username] = data.avatar_url;
                } catch (error) {
                    console.error(`Error fetching profile for ${username}:`, error);
                    profiles[username] = assets.user_icon; // Fallback to default icon
                }
            }
            setTeamProfiles(profiles);
        };

        if (showTeamInfo) {
            fetchGitHubProfiles();
        }
    }, [showTeamInfo]);

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
                                        <>
                                            <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                            <TextToSpeech text={item.content.replace(/<[^>]*>/g, '')} />
                                        </>
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
                            <AudioRecorder onTranscriptionComplete={handleTranscription} />
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
                            <div className="team-info-header">
                                <h3>Team Members</h3>
                                <button 
                                    className="close-button-text"
                                    onClick={handleTeamInfoClick}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="team-cards">
                                <div className="team-card">
                                    <img 
                                        src={teamProfiles['Madvith-d'] || assets.user_icon} 
                                        alt="Profile" 
                                        onError={(e) => e.target.src = assets.user_icon}
                                    />
                                    <div className="team-card-content">
                                        <h4>Madvith</h4>
                                        <a href="https://github.com/Madvith-d" target="_blank" rel="noopener noreferrer">
                                            @Madvith-d
                                        </a>
                                    </div>
                                </div>
                                <div className="team-card">
                                    <img 
                                        src={teamProfiles['Ronit-Pai'] || assets.user_icon} 
                                        alt="Profile"
                                        onError={(e) => e.target.src = assets.user_icon}
                                    />
                                    <div className="team-card-content">
                                        <h4>Ronit Pai</h4>
                                        <a href="https://github.com/Ronit-Pai" target="_blank" rel="noopener noreferrer">
                                            @Ronit-Pai
                                        </a>
                                    </div>
                                </div>
                                <div className="team-card">
                                    <img 
                                        src={teamProfiles['mpriaanka'] || assets.user_icon} 
                                        alt="Profile"
                                        onError={(e) => e.target.src = assets.user_icon}
                                    />
                                    <div className="team-card-content">
                                        <h4>Priaanka</h4>
                                        <a href="https://github.com/mpriaanka" target="_blank" rel="noopener noreferrer">
                                            @mpriaanka
                                        </a>
                                    </div>
                                </div>
                                <div className="team-card">
                                    <img 
                                        src={teamProfiles['Ashil07'] || assets.user_icon} 
                                        alt="Profile"
                                        onError={(e) => e.target.src = assets.user_icon}
                                    />
                                    <div className="team-card-content">
                                        <h4>Ashil</h4>
                                        <a href="https://github.com/Ashil07" target="_blank" rel="noopener noreferrer">
                                            @Ashil07
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Main