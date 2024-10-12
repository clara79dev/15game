export const findZeroIndex = (array) => array.findIndex(n => n === 0);

export const coordsByIndex = (idx) => {
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

export const indexByCoords = (row, col) => {
    return row * 4 + col;
};

export const moveStepUp = (array) => {
    const movedArray = array.slice();

    const emptyCellIdx = findZeroIndex(movedArray);
    const [row, col] = coordsByIndex(emptyCellIdx);

    if (isNotFirstRow(row)) {
        const targetIdx = indexByCoords(row - 1, col);
        const cellValue = movedArray[targetIdx];
        movedArray[targetIdx] = 0;

        const currentIdx = indexByCoords(row, col);
        movedArray[currentIdx] = cellValue;
    }

    return movedArray;
}

export const moveStepDown = (array) => {
    const movedArray = array.slice();

    const emptyCellIdx = findZeroIndex(movedArray);
    const [row, col] = coordsByIndex(emptyCellIdx);

    if (isNotLastRow(row)) {
        const targetIdx = indexByCoords(row + 1, col);
        const cellValue = movedArray[targetIdx];
        movedArray[targetIdx] = 0;

        const currentIdx = indexByCoords(row, col);
        movedArray[currentIdx] = cellValue;
    }

    return movedArray;
}

export const moveStepLeft = (array) => {
    const movedArray = array.slice();

    const emptyCellIdx = findZeroIndex(movedArray);
    const [row, col] = coordsByIndex(emptyCellIdx);

    if (isNotFirstCol(col)) {
        const targetIdx = indexByCoords(row, col - 1);
        const cellValue = movedArray[targetIdx];
        movedArray[targetIdx] = 0;

        const currentIdx = indexByCoords(row, col);
        movedArray[currentIdx] = cellValue;
    }

    return movedArray;
}

export const moveStepRight = (array) => {
    const movedArray = array.slice();

    const emptyCellIdx = findZeroIndex(movedArray);
    const [row, col] = coordsByIndex(emptyCellIdx);

    if (isNotLastCol(col)) {
        const targetIdx = indexByCoords(row, col + 1);
        const cellValue = movedArray[targetIdx];
        movedArray[targetIdx] = 0;

        const currentIdx = indexByCoords(row, col);
        movedArray[currentIdx] = cellValue;
    }

    return movedArray;
}

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function isNotLastCol(col) {
    return col < 3;
}

function isNotFirstCol(col) {
    return col > 0;
}

function isNotLastRow(row) {
    return row < 3;
}

function isNotFirstRow(row) {
    return row > 0;
}

