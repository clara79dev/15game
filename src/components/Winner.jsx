import './Winner.css';

export default function Winner({ onRestart }) {
    return (
        <div>
            <h1 className='jumbo'>WINNER!!!</h1>
            <button className='button' onClick={onRestart}>Restart</button>
        </div>
    );
}