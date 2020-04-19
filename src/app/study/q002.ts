import { IQuestion, TestConsole, Question } from '../study.service';
import { TestConsoleComponent } from '../test-console/test-console.component';

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
    constructor(private testConsole: TestConsole) {
    }
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

    async main() {
        // TestConsoleを使って出力してください
        var dataList_correct = []; 
        for (var i in this.dataList){
           var position = Number(this.dataList[i].split(',')[0]) - 1;
           var data = this.dataList[i].split(',')[1];
           dataList_correct[position] = ( position + 1 ) + "," + data;
        }
        this.testConsole.println(dataList_correct.toString());
    }
}
// 完成までの時間: xx時間 xx分