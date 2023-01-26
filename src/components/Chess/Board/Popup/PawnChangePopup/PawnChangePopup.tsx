import { PawnChangeOptions } from '../../../../../redux/chessSlice'
import { PawnChangePopupProps } from '../PopupTypes'

export const PawnChangePopup = ({
    handlePopupClick,
    color,
}: PawnChangePopupProps) => {
    const pawnChangeOptions: PawnChangeOptions[] = [
        'queen',
        'rook',
        'bishop',
        'knight',
    ]
    const changeElements = [] as JSX.Element[]

    pawnChangeOptions.forEach((type) => {
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
            default:
                break
        }

        changeElements.push(
            <div
                key={`${type}Option`}
                onClick={() => {
                    handlePopupClick(type)
                }}
                className={`
                w-full aspect-square
                flex content-center justify-center
                bg-opacity-60 rounded-50 ${
                    color === 'white' ? 'bg-black' : 'bg-white'
                }
                transition-all
                hover:rounded-sm hover:bg-opacity-80
                group
            `}
            >
                <img
                    className='w-3/4 max-w- aspect-square transition-all group-hover:w-5/6'
                    src={`/chess/pieces/${svgName}.svg`}
                    alt=''
                />
            </div>
        )
    })

    return (
        <div
            className='
                _PawnChangePopup
                absolute top-2/5 left-1/6 w-2/3 h-1/6
                grid grid-cols-4 gap-2
            '
        >
            {changeElements}
        </div>
    )
}
