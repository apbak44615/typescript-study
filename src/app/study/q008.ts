import { IQuestion, TestConsole, Question, SourceMap, FileData } from '../study.service';

/**
 * Q008 埋め込み文字列の抽出
 *
 * 一般に、定数定義の場合を除いて、プログラム中に埋め込み文字列を記述するのは良くないとされています。
 * そのような埋め込み文字列を見つけるために、埋め込み文字列や埋め込み文字（"test"や'a'など）が
 * 記述された行を出力するプログラムを作成してください。
 *
 * - sourceListに設定されたtypescriptファイルをチェックする
 * - ファイル名はディレクトリ付きでも無しでも良い
 * - 行の内容を出力する際は、先頭のインデントは削除しても残しても良い
 * - 文字列が複数行にわたる場合は、1行ずつファイル名と行数を合わせて表示してもよいし、複数行をまとめて1回のファイル名と行数に表示してもよい

[出力イメージ]
q001.ts(12): return "test";  // テストデータ
q002.ts(10): private static final DATA = "test"
q002.ts(11): + "aaa \
   二行目  \
   最後の行";
q003.ts(20): if (test == 'x') {
q004.ts(13): Pattern pattern = Pattern.compile("(\".*\")|(\'.*\')");
q005.ts(20): test10=`
  1行目
  2行目
  3行目
`;

[TypeScriptの文字列とは]
・ダブルクォート、シングルクォートで囲まれたもので、文字列内の "\" はエスケープ文字。行末の "\" は次の行まで文字列が続く
  "test\"test"
  'test\'test'
  " test \
  これで複数行"
・バッククォートで囲まれたものは、複数行にわたる文字列。これも "\" はエスケープ文字

  `
  test
  bbb
  cdef \` aa
  最後の行`

[TypeScriptのコメント]
・Javaと同様
・コメント内部は文字列にはならないので表示から除外する

 */
@Question("ソースファイルから文字列抽出")
export class Q008 implements IQuestion {
    /**
     * typescriptのソース一覧がアタッチされる
     */
    @SourceMap
    sourceList: FileData[];

    // '
    private readonly SINGLE_QUOTE = "'";
    private readonly SINGLE_QUOTE_PATTERN = new RegExp("(?<!\\\\)'", "g");
    // ""
    private readonly DOUBLE_QUOTE = '"';
    private readonly DOUBLE_QUOTE_PATTERN = new RegExp('(?<!\\\\)"', "g");
    // `
    private readonly BACK_QUOTE = '`';
    private readonly BACK_QUOTE_PATTERN = new RegExp("(?<!\\\\)`", "g");
    // //
    private readonly COMMENT_SLASH_PATTERN = new RegExp("\\/\\/", "g");
    // /*
    private readonly COMMENT_ASTERISK_START = "/*";
    private readonly COMMENT_ASTERISK_START_PATTERN = new RegExp("\\/\\*", "g");
    // */
    private readonly COMMENT_ASTERISK_END_PATTERN = new RegExp("\\*\\/", "g");

    constructor(private testConsole: TestConsole) { };

    async main() {

        this.sourceList.forEach(source => {
            let addDelimiter;
            const lines = source.content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const { isDisplay, notClosedDefimiter } = this.checkLine(addDelimiter ? addDelimiter + line : line);
                if (isDisplay) {
                    this.print(source.fileName, i + 1, line);
                }
                addDelimiter = notClosedDefimiter;
            }
        });
    }

    /**
     * 文字列に埋め込み文字が存在するかチェックする
     * 閉じられていない区切り文字（"or'or/*）が存在する場合、それもreturnする
     * 
     * @param {string} line チェック対象の文字列
     * @returns {Object} obj
     * @returns {boolean} obj.isDisplay 表示対象の場合true
     * @returns {string|undefined} obj.notClosedDefimiter 閉じられていない区切り文字
     */
    private checkLine(line: string): {
        isDisplay,
        notClosedDefimiter
    } {
        let checkStartIndex = 0;
        let isDisplay = false;
        let notClosedDefimiter;
        while (true) {
            const checkTargetLine = checkStartIndex !== 0 ? line.slice(checkStartIndex) : line;
            const sqIndex = checkTargetLine.search(this.SINGLE_QUOTE_PATTERN);
            const dqIndex = checkTargetLine.search(this.DOUBLE_QUOTE_PATTERN);
            const bqIndex = checkTargetLine.search(this.BACK_QUOTE_PATTERN);
            const slashIndex = checkTargetLine.search(this.COMMENT_SLASH_PATTERN);
            const asteriskIndex = checkTargetLine.search(this.COMMENT_ASTERISK_START_PATTERN);

            const delimiterIndex = Math.min.apply(null,
                [sqIndex, dqIndex, bqIndex, slashIndex, asteriskIndex].filter(index => index !== -1));
            if (delimiterIndex === NaN) {
                break;
            }

            let nextDelimiterIndex = -1;
            switch (delimiterIndex) {
                case sqIndex:
                    nextDelimiterIndex = checkTargetLine.slice(delimiterIndex + this.SINGLE_QUOTE.length)
                        .search(this.SINGLE_QUOTE_PATTERN);
                    if (nextDelimiterIndex !== -1) {
                        checkStartIndex += delimiterIndex + nextDelimiterIndex + this.SINGLE_QUOTE.length * 2;
                    } else {
                        notClosedDefimiter = this.SINGLE_QUOTE;
                    }
                    isDisplay = true;
                    break;
                case dqIndex:
                    nextDelimiterIndex = checkTargetLine.slice(delimiterIndex + this.DOUBLE_QUOTE.length)
                        .search(this.DOUBLE_QUOTE_PATTERN);
                    if (nextDelimiterIndex !== -1) {
                        checkStartIndex += delimiterIndex + nextDelimiterIndex + this.DOUBLE_QUOTE.length * 2;
                    } else {
                        notClosedDefimiter = this.DOUBLE_QUOTE;
                    }
                    isDisplay = true;
                    break;
                case bqIndex:
                    nextDelimiterIndex = checkTargetLine.slice(delimiterIndex + this.BACK_QUOTE.length)
                        .search(this.BACK_QUOTE_PATTERN);
                    if (nextDelimiterIndex !== -1) {
                        checkStartIndex += delimiterIndex + nextDelimiterIndex + this.BACK_QUOTE.length * 2;
                    } else {
                        notClosedDefimiter = this.BACK_QUOTE;
                    }
                    isDisplay = true;
                    break;
                case asteriskIndex:
                    nextDelimiterIndex = checkTargetLine.slice(delimiterIndex + this.COMMENT_ASTERISK_START.length)
                        .search(this.COMMENT_ASTERISK_END_PATTERN);
                    if (nextDelimiterIndex !== -1) {
                        checkStartIndex += delimiterIndex + nextDelimiterIndex + this.COMMENT_ASTERISK_START.length * 2;
                    } else {
                        notClosedDefimiter = this.COMMENT_ASTERISK_START;
                    }
                    break;
                case slashIndex:
                default:
                    break;
            }

            if (nextDelimiterIndex === -1) {
                break;
            }
        }

        return {
            isDisplay,
            notClosedDefimiter
        };
    }

    /**
     * 入力値をフォーマットで画面に文字列を表示する
     * fileName(row): content
     * 
     * @param fileName ファイル名
     * @param row ファイル内の行数
     * @param line ファイル内の行の文字列
     */
    private print(fileName: string, row: number, line: string) {
        this.testConsole.println(fileName + '(' + row.toString() + '): ' + line);
    }

    // コメントテスト用
    private dummy() {
        /* これは見えてはダメ "test" */
        /* これは見える1 */ let test1 = "aaa";
        // これも見えてはダメ "test"
        let test2 = "aaa"; // これは見えてもよい2
        /*
        複数コメント
        これは見えてはダメ"test"
        見えてよい3 */ let test3 = "aaa";
        let test4 = "aaa"; /* これも見えてよい4 */
        /* "test"*/ let test5 = "aaa"; /* 見えてよい5
        "test"見えてはダメ
        */
        let test6 = "/*見えてよい6";
        let test7 = "見えてよい7";
        let test8 = "aaa"; /*見えてよい8 */
        let test9 = "aa\"bb";  /* 見えてよい9"
        "aaa" 見えてはダメ
        */
        let test10 = "test \
       複数行 \
       /* 見えてよい10  \
       テスト";
        let test11 = `ヒアドキュメント
       複数行が
       見えるはず11
       `;
    }
}
// 完成までの時間: 14時間 30分
