import './Board.css';

export default function Board({ sequence }) {

    const splittedSequences = sequence.reduce((acc, val, index) => {
        const chunkIndex = Math.floor(index / 4);
        if (!acc[chunkIndex]) {
          acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(val);
        return acc;
      }, []);

    return (
        <div>
            <table className="board">
                <tbody>
                    { splittedSequences.map((subSeq, idx) => {
                        return (
                            <tr className="row" key={idx}>
                                { subSeq.map((n, idx) => {
                                    return (
                                        <td className="cell" key={idx}>{n > 0 && n}</td>
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