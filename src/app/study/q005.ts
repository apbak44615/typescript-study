import { IQuestion, TestConsole, Question, TestFile, FileData } from '../study.service';

/**
 * 作業時間管理クラス
 * 自由に修正してかまいません
 */
class WorkData {
    constructor(
        /** 社員番号 */
        private _number: string,
        /** 役職 */
        private _position: string,
        /** Pコード */
        private _pCode: string,
        /** 作業時間(分) */
        private _workTime: number,
    ) { }

    get number() {
        return this._number;
    }
    get position() {
        return this._position;
    }
    get pCode() {
        return this._pCode;
    }
    get workTime() {
        return this._workTime;
    }
}

/**
 * Q005 データクラスと様々な集計
 *
 * 以下のファイルを読み込んで、WorkDataクラスのインスタンスを作成してください。
 * assets/q005.txt
 * (先頭行はタイトルなので読み取りをスキップする)
 *
 * 読み込んだデータを以下で集計して出力してください。
 * (1) 役職別の合計作業時間
 * (2) Pコード別の合計作業時間
 * (3) 社員番号別の合計作業時間
 * 上記項目内での出力順は問いません。
 *
 * 作業時間は "xx時間xx分" の形式にしてください。
 * また、WorkDataクラスは自由に修正してください。
 *
[出力イメージ]
部長: xx時間xx分
課長: xx時間xx分
一般: xx時間xx分
Z-7-31100: xx時間xx分
I-7-31100: xx時間xx分
T-7-30002: xx時間xx分
（省略）
194033: xx時間xx分
195052: xx時間xx分
195066: xx時間xx分
（省略）
 */
@Question("様々なフィールドで集計")
export class Q005 implements IQuestion {
    @TestFile("q005.txt")
    private fileData: FileData;

    constructor(private testConsole: TestConsole) { }

    async main() {
        const lineArray = this.fileData.content.split('\n');
        // タイトル行を削除
        lineArray.shift();
        const workDataArray = lineArray.map(lineString => {
            const columnArray = lineString.split(",");
            return new WorkData(columnArray[0], columnArray[1], columnArray[3], parseInt(columnArray[4], 10));
        });

        // 役職別の合計作業時間の表示
        this.printTotalWorkTime(workDataArray, "position");

        // Pコード別の合計作業時間の表示
        this.printTotalWorkTime(workDataArray, "pCode");

        // 社員番号別の合計作業時間の表示
        this.printTotalWorkTime(workDataArray, "number");
    }

    /**
     * 作業時間を合計しコンソールに表示
     * 
     * @param workDataArray 作業時間管理データリスト
     * @param aggregationKey 作業時間を集約する作業時間管理データのキー名
     */
    private printTotalWorkTime(workDataArray: WorkData[], aggregationKey: string) {
        const totalArray = {};
        workDataArray.forEach((workData) => {
            totalArray[workData[aggregationKey]] = totalArray[workData[aggregationKey]]
                ? totalArray[workData[aggregationKey]] + workData.workTime
                : workData.workTime;
        });
        Object.keys(totalArray).forEach((key) => {
            this.testConsole.println(key + ": "
                + Math.floor(totalArray[key] / 60) + "時間"
                + totalArray[key] % 60 + "分");
        });
    }
}
// 完成までの時間: 55分
