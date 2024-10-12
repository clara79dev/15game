import { indexByCoords } from '../utils/indexes';
import './Board.css';

export default function Board({ sequence, onCellClick }) {

    const splittedSequences = sequence.reduce((acc, val, index) => {
        const chunkIndex = Math.floor(index / 4);
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(val);
        return acc;
    }, []);

    const handleCellClick = (e) => {
        const cellData = e.target.dataset.celldata;
        onCellClick(cellData.split(',').map(s => parseInt(s)));
    };

    return (
        <div>
            <table className="board">
                <tbody>
                    { splittedSequences.map((subSeq, rowIdx) => {
                        return (
                            <tr className="row" key={rowIdx}>
                                { subSeq.map((n, colIdx) => {
                                    return (
                                        <td 
                                            className="cell" 
                                            key={colIdx} 
                                            data-celldata={[rowIdx, colIdx, indexByCoords(rowIdx, colIdx)]} 
                                            onClick={handleCellClick}>{n > 0 && n}
                                        </td>
                                    )
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}