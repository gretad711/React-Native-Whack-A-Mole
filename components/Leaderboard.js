import React from 'react'

function Leaderboard(props) {
    return (
        <div>
           {props.name}: {props.score}
        </div>
    )
}

export default Leaderboard;
