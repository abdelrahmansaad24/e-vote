import React from "react";
import "./Result.css";

const Result = ({ first, second, third, fourth, fifth }) => {
    const totalVotes = first + second + third + fourth + fifth;

    const calculatePercentage = (votes) => {
        return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(2) : 0;
    };

    return (
        <div className="result-percentage">
            <h3>Vote Results</h3>
            <ul>
                <li>
                    Flower ❀: {first} votes ({calculatePercentage(first)}%)
                </li>
                <li>
                    Car 🚗: {second} votes ({calculatePercentage(second)}%)
                </li>
                <li>
                    Book 🕮: {third} votes ({calculatePercentage(third)}%)
                </li>
                <li>
                    Apple 🍎: {fourth} votes ({calculatePercentage(fourth)}%)
                </li>
                <li>
                    Plan ✈: {fifth} votes ({calculatePercentage(fifth)}%)
                </li>
            </ul>
        </div>
    );
};

export default Result;
