import { SquareNum } from '../../../../redux/chessSlice'
import {
    ActivePieceNullable,
    ActiveSquares,
    MakeMoveProps,
} from '../Interfaces'
import { Square } from './Square/Square'
import { Square as SquareType } from '../../../../redux/chessSlice'

export default function Squares({
    activeSquares,
    activePiece,
    makeMove,
}: SquaresProps) {
    // functions
    const handleSquareClick: any = (props: handleSquareClickProps) => {
        const { squareCoords } = props
        if (!activeSquares || !activePiece) return
        for (let square of activeSquares) {
            if (square.x === squareCoords.x && square.y === squareCoords.y)
                makeMove({ activePiece, squareCoords })
        }
    }

    const createSquares = () => {
        let squares = []
        let isSquareWhite = true

        for (let y = 8; y > 0; y--) {
            isSquareWhite = !isSquareWhite
            for (let x = 1; x < 9; x++) {
                let isSquareActive = false
                let isEnemyPieceOnSquare = false
                activeSquares?.forEach((square) => {
                    if (x === square.x && y === square.y) {
                        isSquareActive = true
                        isEnemyPieceOnSquare = square.isEnemyPieceOnSquare
                    }
                })

                const isPieceOnSquareActive =
                    activePiece?.currentSquare.x === x &&
                    activePiece?.currentSquare.y === y

                isSquareWhite = !isSquareWhite
                squares.push(
                    <Square
                        key={`${x}${y}`}
                        isSquareWhite={isSquareWhite}
                        isSquareActive={isSquareActive}
                        isEnemyPieceOnSquare={isEnemyPieceOnSquare}
                        isPieceOnSquareActive={isPieceOnSquareActive}
                        x={x as SquareNum}
                        y={y as SquareNum}
                        handleSquareClick={handleSquareClick}
                    />
                )
            }
        }
        return squares
    }

    // squares render
    const squares = createSquares()

    return (
        <div
            className='
                _Squares chessGrid
                relative z-0
            '
        >
            {squares}
        </div>
    )
}

interface SquaresProps {
    activeSquares: ActiveSquares
    activePiece: ActivePieceNullable
    makeMove: ({ activePiece, squareCoords }: MakeMoveProps) => void
}

export interface handleSquareClickProps {
    squareCoords: SquareType
}
