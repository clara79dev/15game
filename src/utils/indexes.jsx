export const findZeroIndex = (array) => array.findIndex(n => n === 0);

export const coords = (idx) => {
    debugger;
    const col = idx % 4;

    let row = 0;
    while(row * 4 < 16) {
        if (idx <= row * 4 + 3) {
            break;
        }

        ++row;
    }

    return [row, col];
}

export const moveUp = (array) => {
    const movedArray = array.slice();

    const emptyCellIdx = findZeroIndex(movedArray);
    const [row, col] = coords(emptyCellIdx);

    if (row > 0) {
        const targetIdx = (row - 1) * 4 + col;
        const cellValue = movedArray[targetIdx];
        movedArray[targetIdx] = 0;

        const currentIdx = row * 4 + col;
        movedArray[currentIdx] = cellValue;
    }

    return movedArray;
}

export const moveDown = (array) => {
    const movedArray = array.slice();

    const emptyCellIdx = findZeroIndex(movedArray);
    const [row, col] = coords(emptyCellIdx);

    if (row < 3) {
        const targetIdx = (row + 1) * 4 + col;
        const cellValue = movedArray[targetIdx];
        movedArray[targetIdx] = 0;

        const currentIdx = row * 4 + col;
        movedArray[currentIdx] = cellValue;
    }

    return movedArray;
}

export const moveLeft = (array) => {
    const movedArray = array.slice();

    const emptyCellIdx = findZeroIndex(movedArray);
    const [row, col] = coords(emptyCellIdx);

    if (col > 0) {
        const targetIdx = row * 4 + (col - 1);
        const cellValue = movedArray[targetIdx];
        movedArray[targetIdx] = 0;

        const currentIdx = row * 4 + col;
        movedArray[currentIdx] = cellValue;
    }

    return movedArray;
}

export const moveRight = (array) => {
    const movedArray = array.slice();

    const emptyCellIdx = findZeroIndex(movedArray);
    const [row, col] = coords(emptyCellIdx);

    if (col < 3) {
        const targetIdx = row * 4 + (col + 1);
        const cellValue = movedArray[targetIdx];
        movedArray[targetIdx] = 0;

        const currentIdx = row * 4 + col;
        movedArray[currentIdx] = cellValue;
    }

    return movedArray;
}

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
