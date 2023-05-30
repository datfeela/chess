import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../hooks/redux'
import {
    changePiece,
    PawnChangeOptions,
    reset,
} from '../../../../redux/chessSlice'
import { PawnChangePopup } from './PawnChangePopup/PawnChangePopup'
import { LastMovePopupProps } from './PopupTypes'

export const Popup = ({
    lastMove,
    color,
    isCheckmate,
    isStalemate,
    isWhiteMove,
}: LastMovePopupProps) => {
    let [isPopupActive, setIsPopupActive] = useState(false)
    const [isPopupPawnChangeActive, setIsPopupPawnChangeActive] =
        useState(false)
    const [isCheckmatePopupActive, setIsCheckmatePopupActive] = useState(false)

    const dispatch = useAppDispatch()
    const handlePawnChangePopupClick = (pieceType: PawnChangeOptions) => {
        dispatch(
            changePiece({
                piece: lastMove.piece,
                color: color,
                newType: pieceType,
            })
        )
        setIsPopupActive(false)
        setIsPopupPawnChangeActive(false)
    }

    const handleReset = () => {
        dispatch(reset())
    }

    useEffect(() => {
        if (lastMove.effect === 'pawnChange') {
            setIsPopupActive(true)
            setIsPopupPawnChangeActive(true)
        }
        if (isCheckmate || isStalemate) {
            setIsPopupActive(true)
            setIsCheckmatePopupActive(true)
        }
    }, [lastMove, isCheckmate, isStalemate])

    return (
        <div
            className={`
        _LastMovePopup ${isPopupActive ? '' : 'hidden'}
        absolute z-40 top-0 w-full h-full
    `}
        >
            <div
                className='
            _bgShadow
            w-full h-full bg-black opacity-50
        '
            />
            {isPopupPawnChangeActive ? (
                <PawnChangePopup
                    handlePopupClick={handlePawnChangePopupClick}
                    color={color}
                />
            ) : (
                ''
            )}
            {isCheckmatePopupActive ? (
                <div
                    className='
                        absolute top-2/5 w-full
                        flex items-center flex-col
                        p-5
                        bg-black
                        bg-opacity-80
                        text-xl
                    '
                >
                    <div
                        className='
                        mb-4
                    '
                    >
                        {isCheckmate
                            ? `Победа ${isWhiteMove ? 'черных' : 'белых'}`
                            : 'Пат'}
                    </div>
                    <button
                        className='
                        py-2 px-5 bg-sky-600
                        rounded-md
                        opacity-80
                        hover:opacity-100
                    '
                        onClick={handleReset}
                    >
                        Повторить
                    </button>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
