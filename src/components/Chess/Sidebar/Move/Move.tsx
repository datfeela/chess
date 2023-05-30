import type { Move as MoveT, PieceColor } from '../../../../redux/chessSlice'

interface MoveProps {
    imgName: string
    move: MoveT
    color: PieceColor
}

export const Move = ({ imgName, move, color }: MoveProps) => {
    if (move.effect === 'castlingRight') return <div>0-0</div>
    if (move.effect === 'castlingLeft') return <div>0-0-0</div>

    return (
        <div
            className='
                    _moveWhite
                    flex items-center gap-1
                '
        >
            <img className='w-7 h-7 -mt-1' src={imgName} alt='' />
            <span>
                {move.previousPosition.x}-{move.previousPosition.y}
            </span>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='10'
                height='10'
                viewBox='0 0 14 14'
                fill='none'
            >
                <path
                    d='M7.82022 13.7235L13.7528 7.63991C13.8427 7.54773 13.9065 7.44788 13.9443 7.34034C13.9814 7.2328 14 7.11758 14 6.99468C14 6.87178 13.9814 6.75656 13.9443 6.64902C13.9065 6.54149 13.8427 6.44163 13.7528 6.34946L7.82022 0.26589C7.65543 0.0969018 7.44959 0.00841395 7.2027 0.000425426C6.95521 -0.00694859 6.74157 0.0815393 6.5618 0.26589C6.38202 0.434878 6.28824 0.645959 6.28045 0.899134C6.27326 1.15292 6.35955 1.37199 6.53933 1.55634L10.9438 6.07293H0.898876C0.644195 6.07293 0.430562 6.16111 0.257978 6.33747C0.0859928 6.51445 0 6.73352 0 6.99468C0 7.25585 0.0859928 7.47461 0.257978 7.65097C0.430562 7.82795 0.644195 7.91643 0.898876 7.91643H10.9438L6.53933 12.433C6.37453 12.602 6.28824 12.8171 6.28045 13.0782C6.27326 13.3394 6.35955 13.5545 6.53933 13.7235C6.70412 13.9078 6.91386 14 7.16854 14C7.42322 14 7.64045 13.9078 7.82022 13.7235Z'
                    fill='#fff'
                ></path>
            </svg>
            <span>
                {move.newPosition.x}-{move.newPosition.y}
                {move.isCheck ? '+' : ''}
            </span>
        </div>
    )
}
