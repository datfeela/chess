import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../hooks/redux'
import { changePiece, PawnChangeOptions } from '../../../../redux/chessSlice'
import { PawnChangePopup } from './PawnChangePopup/PawnChangePopup'
import { LastMovePopupProps } from './PopupTypes'

export const Popup = ({
    lastMove,
    color,
    isCheckmate,
    isStalemate,
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
                        flex justify-center
                    '
                >
                    {isCheckmate ? 'Шах и мат' : 'Пат'}
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
