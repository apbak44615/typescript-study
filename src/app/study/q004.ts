import { IQuestion, TestConsole, Question } from '../study.service';

/**
 * リスト管理クラス
 * このクラスを変更してはいけません
 */
class ListManager {
    private compareFunc;
    private exchangeFunc;
    private checkFunc;
    private sizeFunc;

    public constructor() {
        let data: number[] = [];
        for (let i = 0; i < 100; i++) {
            data[i] = Math.floor(Math.random() * 10000);
        }
        let compareCount = 0;
        let exchangeCount = 0;
        this.compareFunc = (index1: number, index2: number): number => {
            compareCount++;
            return Math.sign(data[index1] - data[index2]);
        };
        this.exchangeFunc = (index1: number, index2: number): void => {
            exchangeCount++;
            let tmp = data[index1];
            data[index1] = data[index2];
            data[index2] = tmp;
        };
        this.checkFunc = (testConsole: TestConsole): void => {
            let val = data[0];
            for (let i = 1; i < data.length; i++) {
                if (val > data[i]) {
                    throw "ソートされていない: [" + (i - 1) + "]=" + val + ", [" + i + "]=" + data[i];
                }
            }
            testConsole.println("ソートOK: 比較=" + compareCount + ", 入れ替え=" + exchangeCount);
        };
        this.sizeFunc = (): number => data.length;
    }

    /**
     * 2つのデータを比較する
     * @param index1
     * @param index2
     * @return -1:index1のデータが小さい, 1:index2のデータが小さい, 0:同じデータ
     */
    public compare(index1: number, index2: number): number {
        return this.compareFunc(index1, index2);
    }

    /**
     * 2つのデータを入れ替える
     * @param index1 
     * @param index2 
     */
    public exchange(index1: number, index2: number): void {
        return this.exchangeFunc(index1, index2);
    }

    /**
     * ソートが正しく行われたかをチェックする
     * @param testConsole 
     */
    public checkResult(testConsole: TestConsole): void {
        return this.checkFunc(testConsole);
    }

    /**
     * データのサイズを取得する
     */
    public size(): number {
        return this.sizeFunc();
    }
}

/**
 * Q004 ソートアルゴリズム
 *
 * ListManagerクラスをnewして、小さい順に並び変えた上でcheckResult()を呼び出してください。
 *
 * 実装イメージ:
 * let data = new ListManager();
 * // TODO 並び換え
 * data.checkResult(this.testConsole);
 *
 * - ListManagerクラスを修正してはいけません
 * - ListManagerクラスの dataList を直接変更してはいけません
 * - ListManagerクラスの比較 compare と入れ替え exchange を使って実現してください
 */
@Question("ソートアルゴリズムの作成")
export class Q004 implements IQuestion {
    /**
     * コンストラクタ
     * 実行時に自動生成される際、testConsoleが渡されてくる
     * @param testConsole コンソール操作用のオブジェクト
     */
    constructor(private testConsole: TestConsole) {}

    async main() {
        let data = new ListManager();

        // 並び換え
        for(let i = 0; i < data.size() - 1; i++) {
            for(let j = 1; j < data.size() - i; j++) {
                if(data.compare(j, j - 1) === -1) {
                    data.exchange(j, j - 1);
                }
            }
        }
        data.checkResult(this.testConsole);
    }
}
// 完成までの時間: 4時間 30分
