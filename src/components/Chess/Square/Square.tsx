import React from 'react'
import { SquareNum } from '../../../redux/chessSlice'
import { handleSquareClickProps } from '../Board/Board'

export const Square = ({
    isSquareWhite,
    isSquareActive,
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

    // todo: add red bg on hover to pieces than could be taken in PIECE component, fix red bg in THIS component

    return (
        <div
            onClick={onSquareClick}
            className={`
                _Hex
                relative z-10
                w-full aspect-square
                flex justify-center items-center
                ${isSquareWhite ? 'bg-brown-200' : 'bg-brown-600'}
                ${
                    isPieceOnSquareActive &&
                    `before:absolute
                    before:w-full before:aspect-square
                    before:bg-opacity-75 before:bg-sky-700`
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
                            border-solid border-6 border-red-500
                        '
                        ></div>
                    ) : (
                        <div
                            className={`
                        _Circle_move
                        w-1/3 aspect-square rounded-50
                        opacity-75 bg-sky-700
                        group-hover:w-full group-hover:rounded-none
                        `}
                        ></div>
                    )}
                </div>
            ) : null}
        </div>
    )
}

interface SquareProps {
    isSquareWhite: boolean
    isSquareActive: boolean
    isEnemyPieceOnSquare: boolean
    isPieceOnSquareActive: boolean
    x: SquareNum
    y: SquareNum
    handleSquareClick: ({ squareCoords }: handleSquareClickProps) => void
}
