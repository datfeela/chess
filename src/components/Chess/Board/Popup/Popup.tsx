import { useEffect, useState } from 'react'
import { PawnChangePopup } from './PawnChangePopup/PawnChangePopup'
import { LastMovePopupProps, PawnChangeOptions } from './PopupTypes'

export const Popup = ({
    lastMove,
    color,
    isCheckmate,
    isStalemate,
}: LastMovePopupProps) => {
    let [isPopupActive, setIsPopupActive] = useState(false)
    const [isPopupPawnChangeActive, setIsPopupPawnChangeActive] =
        useState(false)

    const handlePawnChangePopupClick = (pieceType: PawnChangeOptions) => {
        // dispatch change here with pieceType
        setIsPopupActive(false)
        setIsPopupPawnChangeActive(false)
    }

    useEffect(() => {
        if (lastMove.effect === 'pawnChange' || isCheckmate || isStalemate)
            setIsPopupActive(true)
        if (lastMove.effect === 'pawnChange') setIsPopupPawnChangeActive(true)
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
        </div>
    )
}
