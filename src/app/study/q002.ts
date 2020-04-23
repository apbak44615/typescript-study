import { IQuestion, TestConsole, Question } from '../study.service';

/**
 * Q002 並べ替える
 *
 * dataListに "ID,名字" の形式で20個のデータがあります。
 * これをID順に並べて表示するプログラムを記述してください。
 *
 * dataListの定義を変更してはいけません。
 *
 *
[出力結果イメージ]
1,伊藤
2,井上
（省略）
9,清水
10,鈴木
11,高橋
（省略）
20,渡辺
 */
@Question("正しく並べ替える")
export class Q002 implements IQuestion {
    /**
     * データ一覧
     */
    private dataList = [
        "8,佐藤",
        "10,鈴木",
        "11,高橋",
        "12,田中",
        "20,渡辺",
        "1,伊藤",
        "18,山本",
        "13,中村",
        "5,小林",
        "3,加藤",
        "19,吉田",
        "17,山田",
        "7,佐々木",
        "16,山口",
        "6,斉藤",
        "15,松本",
        "2,井上",
        "4,木村",
        "14,林",
        "9,清水"
    ];

    constructor(private testConsole: TestConsole) { }

    async main() {
        // TestConsoleを使って出力してください
        this.dataList
            .map((elementString) => elementString.split(','))
            .sort((elementArrayA, elementArrayB) => {
                const numberA = parseInt(elementArrayA[0], 10);
                const numberB = parseInt(elementArrayB[0], 10);
                if (numberA < numberB) {
                    return -1;
                } else if (numberA > numberB) {
                    return 1;
                } else {
                    return 0;
                }
            })
            .map((elementArray) => elementArray.join(','))
            .forEach((elementString) =>
                this.testConsole.println(elementString)
            );
    }
}
// 完成までの時間: 15分
