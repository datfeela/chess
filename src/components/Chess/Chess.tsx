import styled from 'styled-components'
import { Board } from './Board/Board'
import { Sidebar } from './Sidebar/Sidebar'

function Chess(): JSX.Element {
    return (
        <Wrap className='_ChessMain wrap-main'>
            <Board />
            <Sidebar />
        </Wrap>
    )
}

export default Chess

const Wrap = styled.div`
    display: grid;
    gap: 25px;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr;
    grid-auto-flow: row;
    height: 100%;
    position: relative;

    @media (min-width: 1280px) {
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr;
        max-height: 768px;
    }

    @media (max-width: 639px) {
        display: flex;
        flex-direction: column;
        max-height: unset;
    }
`
