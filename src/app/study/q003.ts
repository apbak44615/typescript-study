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
     * コンストラクタ
     * 実行時に自動生成される際、testConsoleが渡されてくる
     * @param testConsole コンソール操作用のオブジェクト
     */
    constructor(private testConsole: TestConsole) {}

    /**
     * 以下の記述で assets/q003.txt の内容が入る
     */
    @TestFile("q003.txt")
    private fileData: FileData;

    async main() {
        const wordCountMap: Map<string, number> = new Map();
        this.fileData.content.split('\n').forEach((line: string) => {
            line.split(' ').forEach((origin: string) => {
                let word = origin.toLowerCase().replace(/\.|,|;|–/, '').replace(/\'/,'’');
                if(word.length > 0) wordCountMap.set(word, wordCountMap.has(word) ? wordCountMap.get(word) + 1 : 1);
            });
        });
        Array.from(wordCountMap.entries()).sort().forEach(([key, value]) => {
            this.testConsole.println(`${(key === 'i' ? key.toUpperCase() : key)}=${value}`);
        })
    }
}
// 完成までの時間: 10時間 30分