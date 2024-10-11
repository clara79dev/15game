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
            <table>
                { splittedSequences.map((subSeq) => {
                    return (
                        <tr>
                            { subSeq.map((n => {
                                return (
                                    <td>{n}</td>
                                )
                            }))}
                        </tr>
                    );
                })}
            </table>
        </div>
    );
}