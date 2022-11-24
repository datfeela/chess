import React from 'react'
import { SquareNum } from '../../../redux/chessSlice'
import { handleSquareClickProps } from '../Board/Board'

export const Square = ({
    isSquareWhite,
    isSquareActive,
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
                w-full aspect-square
                flex justify-center items-center
                ${isSquareWhite ? 'bg-brown-200' : 'bg-brown-600'}
                ${
                    isPieceOnSquareActive &&
                    `before:absolute 
                    before:w-full before:aspect-square
                    before:bg-sky-700 before:bg-opacity-75`
                } 
            `}
        >
            {isSquareActive ? (
                <div
                    className={`
                    _Hex_active
                    absolute z-50 top-0 left-0
                    w-full aspect-square
                `}
                >
                    <div
                        className='
                        _Circle
                        aspect-square rounded-50
                    bg-sky-700
                    opacity-75
                    '
                    ></div>
                </div>
            ) : null}
        </div>
    )
}

interface SquareProps {
    isSquareWhite: boolean
    isSquareActive: boolean
    isPieceOnSquareActive: boolean
    x: SquareNum
    y: SquareNum
    handleSquareClick: ({ squareCoords }: handleSquareClickProps) => void
}
