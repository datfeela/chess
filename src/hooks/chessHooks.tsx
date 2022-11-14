import { Square } from "../redux/chessSlice";
import { RootState } from "../redux/store";
import { useAppSelector } from "./redux";

export const usePiecesPositions = () => {
    const pieces = useAppSelector((state: RootState) => state.chess.pieces);
    const whitePiecesPositions: Array<Square> = [];
    const blackPiecesPositions: Array<Square> = [];

    Object.entries(pieces.white).forEach((piece) => {
        whitePiecesPositions.push(piece[1].square);
    })
    Object.entries(pieces.black).forEach((piece) => {
        blackPiecesPositions.push(piece[1].square);
    })
    return { whitePiecesPositions: whitePiecesPositions, blackPiecesPositions: blackPiecesPositions }
}