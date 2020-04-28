import { IQuestion, TestConsole, Question, TestFile, FileData } from '../study.service';

/**
 * Q003 集計と並べ替え
 *
 * 以下のデータファイルを読み込んで、出現する単語ごとに数をカウントし、アルファベット辞書順に並び変えて出力してください。
 * assets/q003.txt
 * 単語の条件は以下となります
 * - "I"以外は全て小文字で扱う（"My"と"my"は同じく"my"として扱う）
 * - 単数形と複数形のように少しでも文字列が異れば別単語として扱う（"dream"と"dreams"は別単語）
 * - アポストロフィーやハイフン付の単語は1単語として扱う（"isn't"や"dead-end"）
 *
 * 出力形式:単語=数
 *
[出力イメージ]
（省略）
highest=1
I=3
if=2
ignorance=1
（省略）

 * 参考
 * http://eikaiwa.dmm.com/blog/4690/
 */
@Question("単語のカウントを表示する")
export class Q003 implements IQuestion {
    /**
     * 以下の記述で assets/q003.txt の内容が入る
     */
    @TestFile("q003.txt")
    private fileData: FileData;

    constructor(private testConsole: TestConsole) { }

    async main() {
        const wordArray = this.fileData.content
            // スペース改行で分割し単語単位の配列へ変換
            .split(new RegExp("\\s"))
            // I以外を小文字へ変換
            .map((word) => {
                if (word === "I") {
                    return word;
                } else {
                    return word.toLowerCase();
                }
            })
            // 単語として許容する文字以外を削除
            .map((word) =>
                word.replace(new RegExp("[^a-zI'’\\-]", "g"), "")
            )
            // 削除された結果空文字になった単語を削除
            .filter((word) => word)
            // アルファベット辞書順に並び変え
            .sort();

        // 単語の重複数をカウントし表示
        const uniqueWordArray = {};
        wordArray.forEach((word) => {
            uniqueWordArray[word] = uniqueWordArray[word]
                ? uniqueWordArray[word] + 1
                : 1;
        });
        Object.keys(uniqueWordArray).forEach((word) => {
            this.testConsole.println(word + "=" + uniqueWordArray[word]);
        });
    }
}
// 完成までの時間: 1時間 20分
