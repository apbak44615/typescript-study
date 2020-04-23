import { IQuestion, TestConsole, Question } from '../study.service';
import { directiveCreate } from '@angular/core/src/render3/instructions';

/**
 * Q007 最短経路探索
 *
 * 壁を 'X' 通路を ' ' 開始を 'S' ゴールを 'E' で表現された迷路で、最短経路を通った場合に
 * 何歩でゴールまでたどり着くかを出力するプログラムを実装してください。
 * もし、ゴールまで辿り着くルートが無かった場合は -1 を出力してください。
 * なお、1歩は上下左右のいずれかにしか動くことはできません（斜めはNG）。
 *
 * 迷路の横幅と高さは毎回異なりますが、必ず長方形（あるいは正方形）となっており、外壁は全て'X'で埋まっています。
 *

[迷路の例]
XXXXXXXXX
XSX    EX
X XXX X X
X   X X X
X X XXX X
X X     X
XXXXXXXXX

[答え]
14
 */
@Question("迷路の最短距離検索")
export class Q007 implements IQuestion {
    private maze: string[];
    constructor(private testConsole: TestConsole) {
        this.maze = this.makeMaze();
    }

    async main() {
        // this.maze.forEach(line => this.testConsole.println(line));
        // 幅優先探索でスタートからゴールまでのルートを探索する
        const start = this.searchPoint("S");
        const end = this.searchPoint("E");
        const queue: Array<Point> = [];
        // 探索済みの座標のindex配列
        const visitedIndexArray: Array<number> = [];
        queue.push(start);
        const startIndex = this.pointToIndex(start);
        visitedIndexArray[startIndex] = startIndex;
        let isGoaled;

        while (!isGoaled && queue.length > 0) {
            const current = queue.shift();
            // 次の座標（隣り合う上下左右の四つ）
            const nextArray = [new Point(current.x, current.y - 1), new Point(current.x, current.y + 1),
            new Point(current.x - 1, current.y), new Point(current.x + 1, current.y)];
            // 次の座標の値をチェック
            for (const next of nextArray) {
                // 未探索かつ壁でないか
                const nextIndex = this.pointToIndex(next);
                if (visitedIndexArray[nextIndex] == undefined &&
                    this.maze[next.y][next.x] !== "X") {
                    visitedIndexArray[nextIndex] = this.pointToIndex(current);
                    // ゴールなら終了
                    if (next.equals(end)) {
                        isGoaled = true;
                        break;
                    }
                    // ゴールでないなら探索続行
                    else {
                        queue.push(next);
                    }
                }
            };
        }

        if (isGoaled) {
            // かかった歩数を計算
            const endIndex = this.pointToIndex(end);
            let beforeIndex = visitedIndexArray[endIndex];
            let step = 1;
            while (beforeIndex !== startIndex) {
                beforeIndex = visitedIndexArray[beforeIndex];
                step++;
            }
            this.testConsole.println(step.toString());
        } else {
            this.testConsole.println("-1");
        }
    }

    /**
     * 座標をindexへ変換する
     * 
     * @param point 座標
     * @returns index
     */
    private pointToIndex(point: Point) {
        return point.x + this.maze[0].length * point.y;
    }

    /**
     * 指定文字の座標を検索
     * 複数存在する場合は最初にヒットしたものを返却する
     * 
     * @param value 検索対象の文字
     * @returns 検索対象の文字の座標
     */
    private searchPoint(value: string) {
        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                if (this.maze[y][x] === value) {
                    return new Point(x, y);
                }
            }
        }
    }

    /**
     * 迷路を作成する
     */
    private makeMaze(): string[] {
        let data: string[] = [];
        let width = Math.floor(Math.random() * 5) + 5;
        let height = Math.floor(Math.random() * 5) + 5;

        for (let y = 0; y < height * 2 + 3; y++) {
            data.push("");
        }
        for (let x = 0; x < width * 2 + 3; x++) {
            data[0] += "X";
            data[height * 2 + 3 - 1] += "X";
        }

        for (let y = 1; y < data.length - 1; y++) {
            data[y] += 'X';
            for (let x = 1; x < width * 2 + 3 - 1; x++) {
                data[y] += ' ';
            }
            data[y] += 'X';
        }
        let setChar = (x: number, y: number, ch: string) => data[y] = data[y].substring(0, x) + ch + data[y].substr(x + 1);
        let startX = Math.floor(Math.random() * (width + 1)) * 2 + 1;
        let startY = Math.floor(Math.random() * (height + 1)) * 2 + 1;
        setChar(startX, startY, 'S');
        while (true) {
            let endX = Math.floor(Math.random() * (width + 1)) * 2 + 1;
            let endY = Math.floor(Math.random() * (height + 1)) * 2 + 1;
            if (Math.abs(startX - endX) + Math.abs(startY - endY) > 10) {
                setChar(endX, endY, 'E');
                break;
            }
        }
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let xx = x * 2 + 2;
                let yy = y * 2 + 2;
                setChar(xx, yy, 'X');
                switch (Math.floor(Math.random() * 4)) {
                    case 0:
                        setChar(xx, yy - 1, 'X');
                        break;
                    case 1:
                        setChar(xx, yy + 1, 'X');
                        break;
                    case 2:
                        setChar(xx - 1, yy, 'X');
                        break;
                    case 3:
                        setChar(xx + 1, yy, 'X');
                        break;
                }
            }
        }
        return data;
    }
}

class Point {
    constructor(private _x: number, private _y: number) { }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

    equals(other: Point) {
        return this._x === other.x && this._y === other.y ? true : false;
    }
}
// 完成までの時間: 2時間 45分
