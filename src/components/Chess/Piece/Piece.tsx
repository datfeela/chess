import React from 'react'
import styled from 'styled-components'
import {
    PieceColor,
    Pieces,
    PieceType,
    Square,
} from '../../../redux/chessSlice'

// is React.memo needed here?
export const Piece = ({
    name,
    square,
    type,
    color,
    handlePieceClick,
}: PieceProps) => {
    // console.log('piece render')

    const onPieceClick = () => {
        //if piece is still on field, square !== null
        if (square === null) return

        handlePieceClick({
            currentSquare: square,
            type,
            color,
            name,
        })
    }

    return (
        <PieceStyled
            onClick={onPieceClick}
            square={square ? square : null}
            color={color ? color : null}
            className={`
            _Piece
            font-bold ${color === 'white' ? 'text-white' : 'text-black'}
            text-sm
        `}
        >
            {color} <br />
            {type}
        </PieceStyled>
    )
}

// export const Piece = React.memo(PieceNoMemo)

// types

interface PieceProps {
    name: keyof Pieces
    type: PieceType
    square: Square | null
    color: PieceColor
    // checkForMoves: ({ currentSquare, type, color }: CheckForMovesProps) => void
    handlePieceClick: ({ name, color }: handlePieceClickProps) => void
}

export interface handlePieceClickProps {
    name: keyof Pieces
    currentSquare: Square
    type: PieceType
    color: PieceColor
}

// export interface CheckForMovesProps {

// }

// styled

const PieceStyled = styled.div<any>`
    position: absolute;
    z-index: 20;
    width: 12.5%;
    aspect-ratio: 1 / 1 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    top: ${(props) =>
        props.square ? `calc(12.5% *${8 - props.square.y})` : '125%'};
    right: ${(props) =>
        props.square ? `calc(12.5% *${8 - props.square.x})` : '125%'};
`
