import React, {useEffect, useState} from "react";
import "./Login.css";
import Result from "../Results/Result";
import Cookies from 'js-cookie';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [result, setResult] = useState(false);
    const [password, setPassword] = useState("");
    const [loged,setLoged] = useState(false);
    const [listening, setListening] = useState(false);
    const [first, setFirst] = useState(() => {
        // Initialize state from cookies
        const value = Cookies.get('first');
        return value ? JSON.parse(value) : 0;
    });
    const [second, setSecond] = useState(() => {
        // Initialize state from cookies
        const value = Cookies.get('second');
        return value ? JSON.parse(value) : 0;
    });
    const [third, setThird] = useState(() => {
        // Initialize state from cookies
        const value = Cookies.get('third');
        return value ? JSON.parse(value) : 0;
    });
    const [fourth, setFourth] = useState(() => {
        // Initialize state from cookies
        const value = Cookies.get('fourth');
        return value ? JSON.parse(value) : 0;
    });
    const [fifth, setFifth] = useState(() => {
        // Initialize state from cookies
        const value = Cookies.get('fifth');
        return value ? JSON.parse(value) : 0;
    });
    const [command, setCommand] = useState('');
    const readScreen = () => {
        const content = document.body.innerText;
        const utterance = new SpeechSynthesisUtterance(content);

        utterance.lang = 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);
    };

    // Update cookies when the state changes
    useEffect(() => {
        Cookies.set('first', JSON.stringify(first), { expires: 7 });
    }, [first]);

    useEffect(() => {
        Cookies.set('second', JSON.stringify(second), { expires: 7 });
    }, [second]);

    useEffect(() => {
        Cookies.set('third', JSON.stringify(third), { expires: 7 });
    }, [third]);

    useEffect(() => {
        Cookies.set('fourth', JSON.stringify(fourth), { expires: 7 });
    }, [fourth]);

    useEffect(() => {
        Cookies.set('fifth', JSON.stringify(fifth), { expires: 7 });
    }, [fifth]);

    const pauseReading = () => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
        }
    };

    const resumeReading = () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
    };

    const stopReading = () => {
        window.speechSynthesis.cancel();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email !== password) {
            alert("wrong password or email");
        }
        else if(props.users.includes(email)){
            alert("already voted");
        }
        else {
            props.handleADDuser(email);
            setLoged(true);
        }
    };
    useEffect(() => {

        // Check if SpeechRecognition is supported
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn('SpeechRecognition is not supported in this browser.');
            return;
        }

        // Function to handle key press

        const recognition = new SpeechRecognition();
        recognition.continuous = false; // Stop after recognizing one command
        recognition.lang = 'en-US'; // Language for recognition

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            setCommand(transcript);
            handleVoiceCommand(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        const startListening = () => recognition.start();
        const stopListening = () => recognition.stop();

        // Expose start/stop functions
        window.startSpeechRecognition = startListening;
        window.stopSpeechRecognition = stopListening;

        const handleKeyPress = (event) => {
            if (event.key === "c" || event.key === "C") {
                try {
                    startListening()
                }catch (error) {
                    stopListening()
                }
            }

            if (event.key === "r" || event.key === "R") {
                try {
                    readScreen();
                }catch (error) {
                    pauseReading();
                }
            }
            if (event.key === "s" || event.key === "S") {
                try {
                    stopReading();
                }catch (error) {
                    pauseReading();
                }
            }
            if (event.key === " ") {
                try {
                    resumeReading();
                }catch (error) {
                    pauseReading();
                }
            }
        };

        // Attach event listener to the document
        document.addEventListener("keydown", handleKeyPress);


        return () => {
            recognition.stop();
        };
    }, []);

    const handleVoiceCommand = (command) => {
        console.log(`Recognized command: ${command}`);

        if (command.includes('1st') || command.includes('1') || command.includes('first') || command.includes("flower") ) {
            setFirst(first + 1);
        } else if (command.includes('2nd') || command.includes('2') || command.includes('second') || command.includes("car")) {
            setSecond(second+1);
        } else if (command.includes('3rd') || command.includes('3') || command.includes('third') || command.includes("book") ) {
            setThird(third+1);
        } else if (command.includes('fourth') || command.includes('4') || command.includes('4th') || command.includes("apple")) {
            setFourth(fourth+1);
        } else if (command.includes('fifth') || command.includes('5') || command.includes('5th') || command.includes("plan")) {
            setFifth(fifth+1);
        } else {
            console.log('Unknown command');
            return;
        }
        setResult(true);
    };

    return (
        <div className="login-container">
            <h2>E-Voting System</h2>
            <div className="voice-controls">
                <button className="submit" type="button" onClick={window.startSpeechRecognition}
                        disabled={listening}>
                    Start Voice Command
                </button>
                <button className="cancel" type="button" onClick={window.stopSpeechRecognition}
                        disabled={!listening}>
                    Stop Voice Command
                </button>
            </div>
            <p className="command">Recognized Command: {command}</p>
            {
                loged ? (result? <Result first={first} second={second} fifth={fifth} fourth={fourth} third={third}/> :
                    <div>
                    <div className="nav">
                        <button onClick={() => handleVoiceCommand("1")}>
                            First<br />flower ❀
                        </button>
                        <button type="button" onClick={() => handleVoiceCommand("2")}>
                            Second<br />car 🚗
                        </button>
                        <button type="button" onClick={() => handleVoiceCommand("3")}>
                            Third<br/>Book 🕮
                        </button>
                        <button type="button" onClick={() => handleVoiceCommand("4")}>
                            Fourth<br/>apple 🍎
                        </button>
                        <button type="button" onClick={() => handleVoiceCommand("5")}>
                            Fifth<br/>plan ✈
                        </button>
                    </div>
                </div>): <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="ID">ID:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form> }
        </div>
    );
};

export default Login;
