import styled from 'styled-components'
import { Board } from './Board/Board'
import { Sidebar } from './Sidebar/Sidebar'

function Chess(): JSX.Element {
    return (
        <Wrap className='_ChessMain wrap-main'>
            <div />
            <Board />
            <Sidebar />
        </Wrap>
    )
}

export default Chess

const Wrap = styled.div`
    display: grid;
    gap: 25px;
    grid-template-columns: 1fr 2.5fr 1fr;
    max-height: 768px;
    position: relative;
`
