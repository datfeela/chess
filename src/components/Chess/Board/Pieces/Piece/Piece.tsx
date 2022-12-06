import styled from 'styled-components'
import {
    PieceColor,
    Pieces,
    PieceType,
    Square,
} from '../../../../../redux/chessSlice'
import { handlePieceClickProps } from '../../Interfaces'

// is React.memo needed here?
export const Piece = ({
    name,
    square,
    type,
    color,
    isPieceCanBeTaken,
    isPieceActive,
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

    let svgName = color === 'white' ? 'w' : 'b'
    switch (type) {
        case 'rook':
            svgName += 'Rook'
            break
        case 'knight':
            svgName += 'Knight'
            break
        case 'bishop':
            svgName += 'Bishop'
            break
        case 'queen':
            svgName += 'Queen'
            break
        case 'king':
            svgName += 'King'
            break
        case 'pawn':
            svgName += 'Pawn'
            break
        default:
            break
    }

    return (
        <PieceStyled
            onClick={onPieceClick}
            square={square ? square : null}
            className={`
            _Piece
            absolute ${isPieceActive ? 'z-50' : 'z-20'}
            w-1/8 aspect-square
            transition-all duration-500
            before:absolute before:w-full before:aspect-square
            ${isPieceCanBeTaken && 'hover:before:bg-red-default'}
        `}
        >
            <img
                className='relative z-30'
                src={`/chess/pieces/${svgName}.svg`}
                alt=''
            />
        </PieceStyled>
    )
}

// styled

const PieceStyled = styled.div<any>`
    top: ${(props) =>
        props.square ? `calc(12.5% *${8 - props.square.y})` : '125%'};
    right: ${(props) =>
        props.square ? `calc(12.5% *${8 - props.square.x})` : '125%'};
`

// types

interface PieceProps {
    name: keyof Pieces
    type: PieceType
    square: Square | null
    color: PieceColor
    isPieceCanBeTaken: boolean
    isPieceActive: boolean
    handlePieceClick: ({ name, color }: handlePieceClickProps) => void
    // piecesCanBeTakenPositions: Square[]
}
