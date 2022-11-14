import React from 'react'

import { SquareNum } from "../../../redux/chessSlice"

export const Square = React.memo(({ isSquareWhite, isSquareActive, x, y }: SquareProps) => {
    console.log('square render')

    return (
        <div className={`
                _Hex
                relative z-10
                w-full aspect-square
                flex justify-center items-center
                ${isSquareWhite ? "bg-white" : "bg-black"}
            `}>
            {isSquareActive ?
                <div className={`
                    _Hex_active
                    absolute z-50 top-0 left-0
                    w-full aspect-square
                `}>
                    <div className="
                        _Circle
                        aspect-square rounded-50
                    bg-blue-700
                    opacity-75
                    "></div>
                </div> : null}
        </div>
    )
})

interface SquareProps {
    isSquareWhite: boolean,
    isSquareActive: boolean,
    x: SquareNum,
    y: SquareNum,
}