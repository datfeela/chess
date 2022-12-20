import { SquareNum } from '../../../../../redux/chessSlice'
import { handleSquareClickProps } from '../Squares'

export const Square = ({
    isSquareWhite,
    isSquareActive,
    wasSquareActiveLastTurn,
    isEnemyPieceOnSquare,
    isPieceOnSquareActive,
    x,
    y,
    handleSquareClick,
}: SquareProps) => {
    // console.log('square render')

    const onSquareClick = () => {
        if (!isSquareActive) return
        handleSquareClick({ squareCoords: { x, y } })
    }

    return (
        <div
            onClick={onSquareClick}
            className={`
                _Hex
                relative z-10
                w-full aspect-square flexCenter
                ${isSquareWhite ? 'bg-brown-200' : 'bg-brown-600'}
                ${
                    isPieceOnSquareActive &&
                    `before:absolute
                    before:w-full before:aspect-square
                    before:bg-opacity-75 before:bg-blue-default`
                }
            `}
        >
            {isSquareActive ? (
                <div
                    className={`
                    _Hex_active
                    group absolute z-50 top-0 left-0
                    w-full aspect-square
                    flex justify-center items-center
                `}
                >
                    {isEnemyPieceOnSquare ? (
                        <div
                            className='
                            _Square_canTake
                            w-full aspect-square
                            border-solid border-6 border-red-default
                        '
                        ></div>
                    ) : (
                        <div
                            className={`
                        _Circle_move
                        w-1/3 aspect-square rounded-50
                        opacity-75 bg-blue-default
                        group-hover:w-full group-hover:rounded-none
                        `}
                        ></div>
                    )}
                </div>
            ) : wasSquareActiveLastTurn ? (
                <div
                    className='
                            _Square_activeLastTurn
                            w-full aspect-square
                            opacity-75 bg-green-500 
                        '
                ></div>
            ) : null}
        </div>
    )
}

interface SquareProps {
    isSquareWhite: boolean
    isSquareActive: boolean
    wasSquareActiveLastTurn: boolean
    isEnemyPieceOnSquare: boolean
    isPieceOnSquareActive: boolean
    x: SquareNum
    y: SquareNum
    handleSquareClick: ({ squareCoords }: handleSquareClickProps) => void
}
