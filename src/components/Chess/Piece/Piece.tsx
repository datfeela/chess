import React from 'react'

import styled from "styled-components";
import { PieceColor, Pieces, PieceType, Square } from "../../../redux/chessSlice";

export const Piece = React.memo(({ name, square, type, color, activatePiece }: PieceProps) => {
    // console.log('piece render')

    const handlePieceClick = () => {
        if (square !== null) activatePiece({ currentSquare: square, type: type, color: color, name: name })
    }

    return (
        <PieceStyled onClick={handlePieceClick} square={square ? square : null} className="
            _Piece
            text-red-600
        ">
            {square && square.x} {square && square.y}
        </PieceStyled>
    )
})

// export const Piece = React.memo(PieceNoMemo)

// types

interface PieceProps {
    name: keyof Pieces;
    type: PieceType;
    square: Square | null;
    color: PieceColor;
    // checkForMoves: ({ currentSquare, type, color }: CheckForMovesProps) => void
    activatePiece: ({ name, color }: ActivatePieceProps) => void
}

export interface ActivatePieceProps {
    name: keyof Pieces;
    currentSquare: Square;
    type: PieceType;
    color: PieceColor;
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
    top: ${props => props.square ? `calc(12.5% *${8 - props.square.y})` : '125%'};
    right: ${props => props.square ? `calc(12.5% *${8 - props.square.x})` : '125%'};
`